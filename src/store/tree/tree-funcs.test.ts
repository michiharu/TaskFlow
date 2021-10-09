import { treeSettings as settings } from '../../const';
import { Point, Size } from '../../types';
import { FlowNode } from '../../types/tree-node';

import { entityToTree, setPoint, setSize } from './tree-funcs';
import { rootOnlyEntities, flatChildren, nestedChildren, closedChildren } from './tree-test-data';

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
  const resultWithSize: FlowNode = { ...node, size: { body, tree: noChildOpenTree } };
  test('setSize', () => {
    expect(setSize(node, settings, true)).toEqual(resultWithSize);
  });
  test('setPoint', () => {
    const point: Point = { x: 0, y: 0 };
    const resultWithPoint: FlowNode = { ...resultWithSize, point };
    expect(setPoint(resultWithSize, settings, true, point)).toEqual(resultWithPoint);
  });
});

describe('flat children', () => {
  const { root, child1, child2 } = flatChildren;
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
  const rootTreeSize: Size = {
    width: indent * m * 2 + body.width + m,
    height: body.height * 3 + m * 5,
  };
  const childSize = { body, tree: noChildOpenTree };
  const resultWithSize: FlowNode = {
    ...node,
    size: { body: settings.body, tree: rootTreeSize },
    children: [
      { ...child1, size: childSize, children: [] },
      { ...child2, size: childSize, children: [] },
    ],
  };
  test('setSize', () => {
    expect(setSize(node, settings, true)).toEqual(resultWithSize);
  });
  test('setPoint', () => {
    const rootPoint: Point = { x: 0, y: 0 };
    const child1Point: Point = {
      x: indent * m,
      y: body.height + m,
    };
    const child2Point: Point = {
      x: indent * m,
      y: body.height * 2 + m * 3,
    };
    const resultWithPoint: FlowNode = {
      ...resultWithSize,
      point: rootPoint,
      children: [
        { ...child1, size: childSize, point: child1Point, children: [] },
        { ...child2, size: childSize, point: child2Point, children: [] },
      ],
    };
    expect(setPoint(resultWithSize, settings, true, rootPoint)).toEqual(resultWithPoint);
  });
});

describe('nested children', () => {
  const { root, child1, child2 } = nestedChildren;
  const entities = { [root.id]: root, [child1.id]: child1, [child2.id]: child2 };
  const node: FlowNode = {
    ...root,
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
  const rootTreeSize: Size = {
    width: indent * m * 3 + body.width + m * 2,
    height: body.height * 3 + m * 5,
  };
  const child1TreeSize: Size = {
    width: indent * m * 2 + body.width + m,
    height: body.height * 2 + m * 3,
  };
  const resultWithSize: FlowNode = {
    ...node,
    size: { body: settings.body, tree: rootTreeSize },
    children: [
      {
        ...child1,
        size: { body, tree: child1TreeSize },
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
  test('setSize', () => {
    expect(setSize(node, settings, true)).toEqual(resultWithSize);
  });
  test('setPoint', () => {
    const rootPoint: Point = { x: 0, y: 0 };
    const child1Point: Point = {
      x: indent * m,
      y: body.height + m,
    };
    const child2Point: Point = {
      x: indent * m * 2,
      y: body.height * 2 + m * 2,
    };
    const resultWithPoint: FlowNode = {
      ...resultWithSize,
      point: rootPoint,
      children: [
        {
          ...child1,
          size: { body, tree: child1TreeSize },
          point: child1Point,
          children: [
            {
              ...child2,
              size: { body, tree: noChildOpenTree },
              point: child2Point,
              children: [],
            },
          ],
        },
      ],
    };
    expect(setPoint(resultWithSize, settings, true, rootPoint)).toEqual(resultWithPoint);
  });
});

describe('closed children', () => {
  const { root, child1, child2, child3 } = closedChildren;
  const entities = { [root.id]: root, [child1.id]: child1, [child2.id]: child2, [child3.id]: child3 };
  const node: FlowNode = {
    ...root,
    children: [
      { ...child1, children: [{ ...child2, children: [] }] },
      { ...child3, children: [] },
    ],
  };
  test('entityToTree', () => {
    expect(entityToTree(root.id, entities)).toEqual(node);
  });

  const rootTreeSize: Size = {
    width: indent * m * 1 + body.width + m,
    height: body.height * 3 + m * 3,
  };
  const resultWithSize: FlowNode = {
    ...node,
    size: { body: settings.body, tree: rootTreeSize },
    children: [
      { ...child1, size: { body, tree: body }, children: [{ ...child2, children: [] }] },
      { ...child3, size: { body, tree: body }, children: [] },
    ],
  };
  test('setSize', () => {
    expect(setSize(node, settings, true)).toEqual(resultWithSize);
  });
  test('setPoint', () => {
    const rootPoint: Point = { x: 0, y: 0 };
    const child1Point: Point = {
      x: indent * m,
      y: body.height + m,
    };
    const child3Point: Point = {
      x: indent * m,
      y: body.height * 2 + m * 2,
    };
    const resultWithPoint: FlowNode = {
      ...resultWithSize,
      point: rootPoint,
      children: [
        { ...child1, size: { body, tree: body }, point: child1Point, children: [{ ...child2, children: [] }] },
        { ...child3, size: { body, tree: body }, point: child3Point, children: [] },
      ],
    };
    expect(setPoint(resultWithSize, settings, true, rootPoint)).toEqual(resultWithPoint);
  });
});

export {};
