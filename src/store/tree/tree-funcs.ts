/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Dictionary } from '@reduxjs/toolkit';

import { Point, Size, UUID } from '../../types';
import { FlowEntity, FlowNode, TreeSettings } from '../../types/tree-node';

import { TreeEntityState } from './tree-slice';

type FactoryOptions = Partial<Omit<FlowEntity, 'id' | 'childIds'>>;

export const entityFactory = (id: UUID, childIds: UUID[] = [], options: FactoryOptions = {}): FlowEntity => {
  const {
    index = 0,
    type = 'task',
    direction = 'vertical',
    open = true,
    text = { primary: '', secondary: '' },
  } = options;
  return { id, childIds, index, type, direction, open, text };
};

export const entityToTree = (id: UUID, entities: Dictionary<FlowEntity>): FlowNode => {
  const entity = entities[id];
  if (!entity) throw new Error();
  return { ...entity, children: entity.childIds.map((childId) => entityToTree(childId, entities)) };
};

export const setTreeSize = (node: FlowNode, settings: TreeSettings, visible: boolean): FlowNode => {
  const { direction } = node;
  const { card, indent, m } = settings;
  if (!visible) {
    const children = node.children.map((c) => setTreeSize(c, settings, false));
    return { ...node, tree: undefined, children };
  }
  if (!node.open) {
    const children = node.children.map((c) => setTreeSize(c, settings, false));
    return { ...node, tree: card, children };
  }
  if (node.children.length === 0) {
    if (direction === 'vertical') {
      const tree: Size = { width: indent * m + card.width, height: card.height + m };
      return { ...node, tree };
    } else {
      const tree: Size = { width: card.width + m, height: indent * m + card.height };
      return { ...node, tree };
    }
  }
  if (direction === 'vertical') {
    const children = node.children.map((c) => setTreeSize(c, settings, true));
    const width = indent * m + Math.max(...children.map((c) => c.tree!.width)) + m;
    const height = card.height + m + children.map((c) => c.tree!.height + m).reduce((a, b) => a + b);
    return { ...node, tree: { width, height }, children };
  } else {
    const children = node.children.map((c) => setTreeSize(c, settings, true));
    const width = card.width + m + children.map((c) => c.tree!.width + m).reduce((a, b) => a + b);
    const height = indent * m + Math.max(...children.map((c) => c.tree!.height)) + m;
    return { ...node, tree: { width, height }, children };
  }
};

export const setPoint = (node: FlowNode, settings: TreeSettings, visible: boolean, point: Point): FlowNode => {
  const { direction } = node;
  const { card, indent, m } = settings;
  if (!visible) {
    const children = node.children.map((c) => setPoint(c, settings, false, point));
    return { ...node, point: undefined, children };
  }
  if (!node.open) {
    const children = node.children.map((c) => setPoint(c, settings, false, point));
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
    return setPoint(child, settings, true, { x, y });
  });
  return { ...node, point, children };
};

export const nodeToEntities = (node: FlowNode): FlowEntity[] => {
  const { children, ...parent } = node;
  return [parent].concat(children.flatMap((child) => nodeToEntities(child)));
};

export const setRect = (state: TreeEntityState): FlowEntity[] => {
  const { rootId, entities, settings } = state;
  if (!rootId || !entities[rootId]) throw new Error();
  let root = entityToTree(rootId, entities);
  root = setTreeSize(root, settings, true);
  root = setPoint(root, settings, true, { x: settings.stagePadding, y: settings.stagePadding });
  return nodeToEntities(root).map((entity, index) => ({ ...entity, index }));
};
