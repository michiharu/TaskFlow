/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Dictionary } from '@reduxjs/toolkit';

import { Point, Size, UUID } from '../../types';
import { FlowEntity, FlowNode, TreeSettings } from '../../types/tree-node';

import { TreeEntityState } from './tree-slice';

export const rootFactory = (id: UUID, childIds: UUID[], primary: string): FlowEntity => ({
  id,
  index: 0,
  childIds,
  type: 'root',
  direction: 'vertical',
  open: true,
  text: { primary, secondary: '' },
});

export const taskFactory = (id: UUID, childIds: UUID[], primary: string): FlowEntity => ({
  id,
  index: 0,
  childIds,
  type: 'task',
  direction: 'vertical',
  open: true,
  text: { primary, secondary: '' },
});

export const entityToTree = (id: UUID, entities: Dictionary<FlowEntity>): FlowNode => {
  const entity = entities[id];
  if (!entity) throw new Error();
  return { ...entity, children: entity.childIds.map((childId) => entityToTree(childId, entities)) };
};

export const setSize = (node: FlowNode, settings: TreeSettings, visible: boolean): FlowNode => {
  const { direction } = node;
  const { body, indent, m } = settings;
  if (!visible) {
    const children = node.children.map((c) => setSize(c, settings, false));
    return { ...node, size: undefined, children };
  }
  if (!node.open) {
    const children = node.children.map((c) => setSize(c, settings, false));
    const size = { body, tree: body };
    return { ...node, size, children };
  }
  if (node.children.length === 0) {
    const tree: Size = {
      width: direction === 'vertical' ? indent * m + body.width : body.width + m,
      height: direction === 'vertical' ? body.height + m : indent * m + body.height,
    };
    const size = { body, tree };
    return { ...node, size };
  }
  if (direction === 'vertical') {
    const children = node.children.map((c) => setSize(c, settings, true));
    const width = indent * m + Math.max(...children.map((c) => c.size!.tree.width)) + m;
    const height = body.height + m + children.map((c) => c.size!.tree.height + m).reduce((a, b) => a + b);
    const size = { body: settings.body, tree: { width, height } };
    return { ...node, size, children };
  } else {
    const children = node.children.map((c) => setSize(c, settings, true));
    const width = body.width + m + children.map((c) => c.size!.tree.width + m).reduce((a, b) => a + b);
    const height = indent * m + Math.max(...children.map((c) => c.size!.tree.height)) + m;
    const size = { body: settings.body, tree: { width, height } };
    return { ...node, size, children };
  }
};

export const setPoint = (node: FlowNode, settings: TreeSettings, visible: boolean, point: Point): FlowNode => {
  const { direction } = node;
  const { body, indent, m } = settings;
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
    const x = point.x + (direction === 'vertical' ? indent * m : body.width + m + anchor);
    const y = point.y + (direction === 'vertical' ? body.height + m + anchor : indent * m);
    anchor += (direction === 'vertical' ? child.size!.tree.height : child.size!.tree.width) + m;
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
  root = setSize(root, settings, true);
  root = setPoint(root, settings, true, { x: settings.stagePadding, y: settings.stagePadding });
  return nodeToEntities(root).map((entity, index) => ({ ...entity, index }));
};
