/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Dictionary, EntityState } from '@reduxjs/toolkit';

import { entitySettings } from '../../const';
import type { UUID } from '../../types/common';
import type {
  AddablePointOfEntity,
  FlowEntity,
  FlowNode,
  FlowState,
  Point,
  SelectedStatus,
  Size,
  TreePointOfEntity,
} from '../../types/flow-entity';

const { card, indent, m, stagePadding } = entitySettings;

type FactoryOptions = Partial<Omit<FlowEntity, 'id' | 'childIds'>>;

export const entityFactory = (id: UUID, childIds: UUID[] = [], options: FactoryOptions = {}): FlowEntity => {
  const { index = 0, type = 'task', direction = 'vertical', open = true, text = '' } = options;
  return { id, childIds, index, type, direction, open, text };
};

export const entityToTree = (id: UUID, entities: Dictionary<FlowEntity>): FlowNode => {
  const entity = entities[id];
  if (!entity) throw new Error();
  return { ...entity, children: entity.childIds.map((childId) => entityToTree(childId, entities)) };
};

export const setTreeSize = (node: FlowNode, visible: boolean): FlowNode => {
  const { direction } = node;
  if (!visible) {
    const children = node.children.map((c) => setTreeSize(c, false));
    return { ...node, tree: undefined, children };
  }
  if (!node.open) {
    const children = node.children.map((c) => setTreeSize(c, false));
    return { ...node, tree: card, children };
  }
  if (node.children.length === 0) {
    if (direction === 'vertical') {
      const tree: Size = { width: indent * m + card.width, height: card.height + m };
      return { ...node, tree };
    }
    const tree: Size = { width: card.width + m, height: indent * m + card.height };
    return { ...node, tree };
  }
  if (direction === 'vertical') {
    const children = node.children.map((c) => setTreeSize(c, true));
    const width = indent * m + Math.max(...children.map((c) => c.tree!.width)) + m;
    const height = card.height + m + children.map((c) => c.tree!.height + m).reduce((a, b) => a + b);
    return { ...node, tree: { width, height }, children };
  }
  const children = node.children.map((c) => setTreeSize(c, true));
  const width = card.width + m + children.map((c) => c.tree!.width + m).reduce((a, b) => a + b);
  const height = indent * m + Math.max(...children.map((c) => c.tree!.height)) + m;
  return { ...node, tree: { width, height }, children };
};

export const setPoint = (node: FlowNode, visible: boolean, point: Point): FlowNode => {
  const { direction } = node;
  if (!visible) {
    const children = node.children.map((c) => setPoint(c, false, point));
    return { ...node, point: undefined, children };
  }
  if (!node.open) {
    const children = node.children.map((c) => setPoint(c, false, point));
    return { ...node, point, children };
  }
  if (node.children.length === 0) {
    return { ...node, point };
  }

  let anchor = 0;
  const children = node.children.map((child) => {
    const x = point.x + (direction === 'vertical' ? indent * m : card.width + m + anchor);
    const y = point.y + (direction === 'vertical' ? card.height + m + anchor : indent * m);
    anchor += (direction === 'vertical' ? child.tree!.height : child.tree!.width) + m;
    return setPoint(child, true, { x, y });
  });
  return { ...node, point, children };
};

export const nodeToEntities = (node: FlowNode, depth = 0): FlowEntity[] => {
  const { children, ...parent } = node;
  return [parent].concat(
    children.flatMap((child, index) => {
      const { id, direction, childIds } = parent;
      return nodeToEntities({ ...child, parent: { id, direction, childIds, index }, depth }, depth + 1);
    })
  );
};

export const setRect = (state: EntityState<FlowEntity> & FlowState): FlowEntity[] => {
  const { flow, entities } = state;
  if (!flow) throw new Error();
  const { rootId } = flow;
  if (!entities[rootId]) throw new Error();
  let root = entityToTree(rootId, entities);
  root = setTreeSize(root, true);
  root = setPoint(root, true, { x: stagePadding, y: stagePadding });
  return nodeToEntities(root).map((entity, index) => ({ ...entity, index }));
};

export const calcAddablePoints = (
  entities: FlowEntity[],
  selected: SelectedStatus | undefined
): AddablePointOfEntity[] =>
  entities.flatMap(({ id, point, open, childIds, direction, parent, tree }) => {
    if (!point || !tree) return [];
    const points: AddablePointOfEntity[] = [];
    const dragging = selected?.status === 'dragging';

    // as first child
    if (open && (!dragging || selected?.id !== childIds[0])) {
      const left = point.x + (direction === 'vertical' ? indent * m + card.width / 2 : card.width + m / 2);
      const top = point.y + (direction === 'vertical' ? card.height + m / 2 : indent * m + card.height / 2);
      const x = left - (direction === 'vertical' ? card.width / 2 : m / 2);
      const y = top - (direction === 'vertical' ? m / 2 : card.height / 2);
      const width = direction === 'vertical' ? card.width : m;
      const height = direction === 'vertical' ? m : card.height;
      points.push({ parent: { id, direction, childIds, index: 0 }, left, top, x, y, width, height });
    }
    // as next
    const isBefore = parent?.childIds[parent?.index] === selected?.id;
    const isNext = parent?.childIds[parent.index + 1] === selected?.id;
    if (parent && !(dragging && isBefore) && !(dragging && isNext)) {
      const left = point.x + (parent.direction === 'vertical' ? card.width / 2 : tree.width + m / 2);
      const top = point.y + (parent.direction === 'vertical' ? tree.height + m / 2 : card.height / 2);
      const x = left - (parent.direction === 'vertical' ? card.width / 2 : m / 2);
      const y = top - (parent.direction === 'vertical' ? m / 2 : card.height / 2);
      const width = parent.direction === 'vertical' ? card.width : m;
      const height = parent.direction === 'vertical' ? m : card.height;
      points.push({ parent: { ...parent, index: parent.index + 1 }, left, top, x, y, width, height });
    }
    return points;
  });

export const calcTreePoints = (entities: FlowEntity[]): TreePointOfEntity[] =>
  entities
    .slice()
    .sort((a, b) => {
      if (a.depth === undefined || b.depth === undefined) throw new Error();
      return a.depth < b.depth ? 1 : -1;
    })
    .map(({ id, point, tree, depth }) => {
      if (!point || !tree || depth === undefined) throw new Error();
      return { id, ...tree, ...point, depth };
    });
