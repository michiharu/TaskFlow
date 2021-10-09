import { treeSettings as settings } from '../../const';
import { Size } from '../../types';
import { FlowNode } from '../../types/tree-node';

import { entityToTree, setSize } from './tree-funcs';
import { rootOnlyEntities, rootHasFlatChildren, rootHasNestedChildren } from './tree-test-data';

const { body, indent, m } = settings;

const noChildOpenTree: Size = {
  width: indent * m + body.width,
  height: body.height + m,
};

describe('root only', () => {
  const { root } = rootOnlyEntities;
  const entities = { [root.id]: root };
  const node: FlowNode = { ...root, children: [] };
  test('entityToTree', () => {
    expect(entityToTree(root.id, entities)).toEqual(node);
  });
  test('setSize', () => {
    const result: FlowNode = { ...node, size: { body, tree: noChildOpenTree } };
    expect(setSize(node, settings, true)).toEqual(result);
  });
});

describe('root has children (flat, open)', () => {
  const { root, child1, child2 } = rootHasFlatChildren;
  const entities = { [root.id]: root, [child1.id]: child1, [child2.id]: child2 };
  const node: FlowNode = {
    ...root,
    childIds: [child1.id, child2.id],
    children: [
      { ...child1, children: [] },
      { ...child2, children: [] },
    ],
  };
  test('entityToTree', () => {
    expect(entityToTree(root.id, entities)).toEqual(node);
  });
  test('setSize', () => {
    const rootTreeSize: Size = {
      width: indent * m * 2 + body.width + m,
      height: body.height * 3 + m * 5,
    };
    const result: FlowNode = {
      ...node,
      size: { body: settings.body, tree: rootTreeSize },
      children: [
        { ...child1, size: { body, tree: noChildOpenTree }, children: [] },
        { ...child2, size: { body, tree: noChildOpenTree }, children: [] },
      ],
    };
    expect(setSize(node, settings, true)).toEqual(result);
  });
});

describe('root has children (nested)', () => {
  const { root, child1, child2 } = rootHasNestedChildren;
  const entities = { [root.id]: root, [child1.id]: child1, [child2.id]: child2 };
  const node: FlowNode = {
    ...root,
    childIds: [child1.id],
    children: [
      {
        ...child1,
        childIds: [child2.id],
        children: [{ ...child2, childIds: [], children: [] }],
      },
    ],
  };
  test('entityToTree', () => {
    expect(entityToTree(root.id, entities)).toEqual(node);
  });

  test('setSize', () => {
    const rootTreeSize: Size = {
      width: indent * m * 3 + body.width + m * 2,
      height: body.height * 3 + m * 5,
    };
    const child1TreeSize: Size = {
      width: indent * m * 2 + body.width + m,
      height: body.height * 2 + m * 3,
    };
    const result: FlowNode = {
      ...node,
      size: { body: settings.body, tree: rootTreeSize },
      children: [
        {
          ...child1,
          size: { body, tree: child1TreeSize },
          childIds: [child2.id],
          children: [
            {
              ...child2,
              size: { body, tree: noChildOpenTree },
              children: [],
            },
          ],
        },
      ],
    };
    expect(setSize(node, settings, true)).toEqual(result);
  });
});

export {};
