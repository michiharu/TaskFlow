/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Dictionary, EntityAdapter } from '@reduxjs/toolkit';

import { entitySettings } from '../../const';
import type { UUID } from '../../types/common';
import type { AddablePoint, DropZone, FlowEntity, FlowNode, Point } from '../../types/flow-entity';

import type { FlowEntitySliceState } from './slice';

const { card, indent, m, stagePadding } = entitySettings;

type FactoryOptions = Partial<Omit<FlowEntity, 'id' | 'childIds'>>;

export const entityFactory = (id: UUID, childIds: UUID[] = [], options: FactoryOptions = {}): FlowEntity => {
  const { flowIndex = 0, type = 'task', direction = 'vertical', open = true, text = '' } = options;
  return { id, childIds, flowIndex, type, direction, open, text };
};

export const entityToTree = (id: UUID, entities: Dictionary<FlowEntity>): FlowNode => {
  const entity = entities[id];
  if (!entity) throw new Error();
  const children = entity.childIds.map((childId) => entityToTree(childId, entities));
  return {
    ...entity,
    children,
    tree: undefined,
    point: undefined,
    addable: undefined,
  };
};

export const setTreeSize = (node: FlowNode): FlowNode => {
  const { direction } = node;
  if (!node.open) return { ...node, tree: card };

  if (node.children.length === 0) {
    const width = direction === 'vertical' ? indent * m + card.width : card.width + m;
    const height = direction === 'horizontal' ? indent * m + card.height : card.height + m;
    return { ...node, tree: { width, height } };
  }
  const children = node.children.map((c) => setTreeSize(c));
  const width =
    direction === 'vertical'
      ? indent * m + Math.max(...children.map((c) => c.tree!.width)) + m
      : card.width + m + children.map((c) => c.tree!.width + m).reduce((a, b) => a + b);
  const height =
    direction === 'horizontal'
      ? indent * m + Math.max(...children.map((c) => c.tree!.height)) + m
      : card.height + m + children.map((c) => c.tree!.height + m).reduce((a, b) => a + b);
  return { ...node, tree: { width, height }, children };
};

export const setPoint = (node: FlowNode, point: Point): FlowNode => {
  const { direction } = node;
  if (!node.open || node.children.length === 0) return { ...node, point };

  let anchor = 0;
  const children = node.children.map((child) => {
    const x = point.x + (direction === 'vertical' ? indent * m : card.width + m + anchor);
    const y = point.y + (direction === 'horizontal' ? indent * m : card.height + m + anchor);
    anchor += (direction === 'vertical' ? child.tree!.height : child.tree!.width) + m;
    return setPoint(child, { x, y });
  });
  return { ...node, point, children };
};

export const setAddable = (node: FlowNode, parent?: FlowNode, depth = 0): FlowNode => {
  const children = node.children.map((c) => setAddable(c, node, depth + 1));
  if (!node.point || !node.tree) return { ...node, children };

  const points: AddablePoint[] = [];
  const zones: DropZone[] = [];

  // as first child
  if (node.open) {
    const { id, point, direction, childIds, tree } = node;

    const left = point.x + (direction === 'vertical' ? indent * m + card.width / 2 : card.width + m / 2);
    const top = point.y + (direction === 'horizontal' ? indent * m + card.height / 2 : card.height + m / 2);
    points.push({ parent: { id, direction, childIds, index: 0 }, left, top });

    const x = point.x + (direction === 'vertical' ? 0 : card.width / 2);
    const y = point.y + (direction === 'horizontal' ? 0 : card.height / 2);
    const width = direction === 'vertical' ? tree.width : card.width + m;
    const height = direction === 'horizontal' ? tree.height : card.height + m;
    zones.push({
      parent: { id, direction, childIds, index: 0 },
      from: node.id,
      depth: depth + 1,
      x,
      y,
      width,
      height,
    });
  }

  // as next
  if (parent) {
    const { id, point, direction, childIds, tree } = parent;
    if (!point || !tree) throw new Error();

    const nextIndex = childIds.indexOf(node.id) + 1;

    const left = node.point.x + (direction === 'vertical' ? card.width / 2 : node.tree.width + m / 2);
    const top = node.point.y + (direction === 'horizontal' ? card.height / 2 : node.tree.height + m / 2);
    points.push({
      parent: { id, direction, childIds, index: nextIndex },
      left,
      top,
    });

    const x = direction === 'vertical' ? point.x : node.point.x + node.tree.width - card.width * 0.5;
    const y = direction === 'horizontal' ? point.y : node.point.y + node.tree.height - card.height * 0.5;
    const width = direction === 'vertical' ? tree.width : card.width + m;
    const height = direction === 'horizontal' ? tree.height : card.height + m;

    zones.push({
      parent: { id, direction, childIds, index: nextIndex },
      from: node.id,
      depth,
      x,
      y,
      width,
      height,
    });
  }
  return { ...node, addable: { points, zones }, children };
};

export const nodeToEntities = (node: FlowNode): FlowEntity[] => {
  const { children, ...parent } = node;
  return [parent].concat(
    children.flatMap((child, index) => {
      const { id, direction, childIds } = parent;
      return nodeToEntities({
        ...child,
        parent: { id, direction, childIds, index },
      });
    })
  );
};

export const calculate = (state: FlowEntitySliceState, adapter: EntityAdapter<FlowEntity>): void => {
  const { flow } = state;
  if (!flow) throw new Error();
  const { rootId } = flow;
  if (!state.entities[rootId]) throw new Error();
  let root = entityToTree(rootId, state.entities);
  root = setTreeSize(root);
  root = setPoint(root, { x: stagePadding, y: stagePadding });
  root = setAddable(root, undefined);
  const entities: FlowEntity[] = nodeToEntities(root).map((entity, flowIndex) => ({ ...entity, flowIndex }));
  state.addablePoints = entities.flatMap((entity) => entity.addable?.points ?? []);
  state.dropZones = entities.flatMap((entity) => entity.addable?.zones ?? []).sort((a, b) => b.depth - a.depth);
  entities.forEach((entity) => delete entity.addable);
  adapter.setAll(state, entities);
};
