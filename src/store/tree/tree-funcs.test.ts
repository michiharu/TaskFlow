import { treeSettings as settings } from '../../const';
import { Point, Size } from '../../types';
import { FlowNode } from '../../types/tree-node';

import { entityToTree, setPoint, setSize } from './tree-funcs';
import {
  rootOnlyEntities,
  flatEntities,
  nestedEntities,
  closedEntities,
  horizontalEntities,
  nestedClosedEntities,
  rootId,
} from './tree-test-data';

const { body, indent, m } = settings;

const noChildOpenTree: Size = {
  width: indent * m + body.width,
  height: body.height + m,
};

test('entityToTree throw error', () => {
  expect(() => entityToTree(rootId, {})).toThrow();
});

describe('root only', () => {
  const { root } = rootOnlyEntities;
  const entities = { [root.id]: root };
  const node: FlowNode = { ...root, children: [] };
  test('entityToTree', () => {
    expect(entityToTree(root.id, entities)).toEqual(node);
  });
  const nodeWithSize: FlowNode = { ...node, size: { body, tree: noChildOpenTree } };
  test('setSize', () => {
    expect(setSize(node, settings, true)).toEqual(nodeWithSize);
  });
  test('setPoint', () => {
    const point: Point = { x: 0, y: 0 };
    const resultWithPoint: FlowNode = { ...nodeWithSize, point };
    expect(setPoint(nodeWithSize, settings, true, point)).toEqual(resultWithPoint);
  });
});

describe('flat entities', () => {
  const { root, child1, child2, child3 } = flatEntities;
  const entities = { [root.id]: root, [child1.id]: child1, [child2.id]: child2, [child3.id]: child3 };
  const node: FlowNode = {
    ...root,
    children: [
      { ...child1, children: [] },
      { ...child2, children: [] },
      { ...child3, children: [] },
    ],
  };
  test('entityToTree', () => {
    expect(entityToTree(root.id, entities)).toEqual(node);
  });
  const rootTree: Size = { width: indent * m * 2 + body.width + m, height: body.height * 4 + m * 7 };
  const nodeWithSize: FlowNode = {
    ...node,
    size: { body: settings.body, tree: rootTree },
    children: [
      { ...child1, size: { body, tree: noChildOpenTree }, children: [] },
      { ...child2, size: { body, tree: noChildOpenTree }, children: [] },
      { ...child3, size: { body, tree: noChildOpenTree }, children: [] },
    ],
  };
  test('setSize', () => {
    expect(setSize(node, settings, true)).toEqual(nodeWithSize);
  });
  test('setPoint', () => {
    const rootPoint: Point = { x: 0, y: 0 };
    const child1Point: Point = { x: indent * m, y: body.height + m };
    const child2Point: Point = { x: indent * m, y: body.height * 2 + m * 3 };
    const child3Point: Point = { x: indent * m, y: body.height * 3 + m * 5 };
    const resultWithPoint: FlowNode = {
      ...nodeWithSize,
      point: rootPoint,
      children: [
        { ...child1, size: { body, tree: noChildOpenTree }, point: child1Point, children: [] },
        { ...child2, size: { body, tree: noChildOpenTree }, point: child2Point, children: [] },
        { ...child3, size: { body, tree: noChildOpenTree }, point: child3Point, children: [] },
      ],
    };
    expect(setPoint(nodeWithSize, settings, true, rootPoint)).toEqual(resultWithPoint);
  });
});

describe('nested entities', () => {
  const { root, child1, child2, child3 } = nestedEntities;
  const entities = { [root.id]: root, [child1.id]: child1, [child2.id]: child2, [child3.id]: child3 };
  const node: FlowNode = {
    ...root,
    children: [{ ...child1, children: [{ ...child2, children: [{ ...child3, children: [] }] }] }],
  };
  test('entityToTree', () => {
    expect(entityToTree(root.id, entities)).toEqual(node);
  });
  const rootTree: Size = { width: indent * m * 4 + body.width + m * 3, height: body.height * 4 + m * 7 };
  const child1Tree: Size = { width: indent * m * 3 + body.width + m * 2, height: body.height * 3 + m * 5 };
  const child2Tree: Size = { width: indent * m * 2 + body.width + m, height: body.height * 2 + m * 3 };
  const nodeWithSize: FlowNode = {
    ...node,
    size: { body: settings.body, tree: rootTree },
    children: [
      {
        ...child1,
        size: { body, tree: child1Tree },
        children: [
          {
            ...child2,
            size: { body, tree: child2Tree },
            children: [
              {
                ...child3,
                size: { body, tree: noChildOpenTree },
                children: [],
              },
            ],
          },
        ],
      },
    ],
  };
  test('setSize', () => {
    expect(setSize(node, settings, true)).toEqual(nodeWithSize);
  });
  test('setPoint', () => {
    const rootPoint: Point = { x: 0, y: 0 };
    const child1Point: Point = { x: indent * m, y: body.height + m };
    const child2Point: Point = { x: indent * m * 2, y: body.height * 2 + m * 2 };
    const child3Point: Point = { x: indent * m * 3, y: body.height * 3 + m * 3 };
    const resultWithPoint: FlowNode = {
      ...nodeWithSize,
      point: rootPoint,
      children: [
        {
          ...child1,
          size: { body, tree: child1Tree },
          point: child1Point,
          children: [
            {
              ...child2,
              size: { body, tree: child2Tree },
              point: child2Point,
              children: [
                {
                  ...child3,
                  size: { body, tree: noChildOpenTree },
                  point: child3Point,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    };
    expect(setPoint(nodeWithSize, settings, true, rootPoint)).toEqual(resultWithPoint);
  });
});

describe('closed entities', () => {
  const { root, child1, child2, child3 } = closedEntities;
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

  const rootTree: Size = {
    width: indent * m * 1 + body.width + m,
    height: body.height * 3 + m * 3,
  };
  const nodeWithSize: FlowNode = {
    ...node,
    size: { body: settings.body, tree: rootTree },
    children: [
      { ...child1, size: { body, tree: body }, children: [{ ...child2, children: [] }] },
      { ...child3, size: { body, tree: body }, children: [] },
    ],
  };
  test('setSize', () => {
    expect(setSize(node, settings, true)).toEqual(nodeWithSize);
  });
  test('setPoint', () => {
    const rootPoint: Point = { x: 0, y: 0 };
    const child1Point: Point = { x: indent * m, y: body.height + m };
    const child3Point: Point = { x: indent * m, y: body.height * 2 + m * 2 };
    const resultWithPoint: FlowNode = {
      ...nodeWithSize,
      point: rootPoint,
      children: [
        { ...child1, size: { body, tree: body }, point: child1Point, children: [{ ...child2, children: [] }] },
        { ...child3, size: { body, tree: body }, point: child3Point, children: [] },
      ],
    };
    expect(setPoint(nodeWithSize, settings, true, rootPoint)).toEqual(resultWithPoint);
  });
});

describe('horizontal entities', () => {
  const { root, child1, child2, child3 } = horizontalEntities;
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

  const rootTree: Size = { width: body.width * 4 + indent * m * 2 + m * 5, height: body.height * 3 + m * 3 };
  const child1Tree: Size = { width: body.width * 2 + indent * m + m * 2, height: body.height * 2 + m * 2 };
  const nodeWithSize: FlowNode = {
    ...node,
    size: { body: settings.body, tree: rootTree },
    children: [
      {
        ...child1,
        size: { body, tree: child1Tree },
        children: [{ ...child2, size: { body, tree: noChildOpenTree }, children: [] }],
      },
      { ...child3, size: { body, tree: noChildOpenTree }, children: [] },
    ],
  };
  test('setSize', () => {
    expect(setSize(node, settings, true)).toEqual(nodeWithSize);
  });
  test('setPoint', () => {
    const rootPoint: Point = { x: 0, y: 0 };
    const child1Point: Point = { x: body.width + m, y: indent * m };
    const child2Point: Point = { x: body.width * 2 + m * 2, y: indent * m * 2 };
    const child3Point: Point = { x: body.width * 3 + indent * m + m * 4, y: indent * m };

    const resultWithPoint: FlowNode = {
      ...nodeWithSize,
      point: rootPoint,
      children: [
        {
          ...child1,
          size: { body, tree: child1Tree },
          point: child1Point,
          children: [{ ...child2, size: { body, tree: noChildOpenTree }, point: child2Point, children: [] }],
        },
        { ...child3, size: { body, tree: noChildOpenTree }, point: child3Point, children: [] },
      ],
    };
    expect(setPoint(nodeWithSize, settings, true, rootPoint)).toEqual(resultWithPoint);
  });
});

describe('nested closed entities', () => {
  const { root, child1, child2, child3 } = nestedClosedEntities;
  const entities = { [root.id]: root, [child1.id]: child1, [child2.id]: child2, [child3.id]: child3 };
  const node: FlowNode = {
    ...root,
    children: [{ ...child1, children: [{ ...child2, children: [{ ...child3, children: [] }] }] }],
  };
  test('entityToTree', () => {
    expect(entityToTree(root.id, entities)).toEqual(node);
  });
  const rootTree: Size = { width: indent * m + body.width + m, height: body.height * 2 + m * 2 };
  const nodeWithSize: FlowNode = {
    ...node,
    size: { body: settings.body, tree: rootTree },
    children: [
      { ...child1, size: { body, tree: body }, children: [{ ...child2, children: [{ ...child3, children: [] }] }] },
    ],
  };
  test('setSize', () => {
    expect(setSize(node, settings, true)).toEqual(nodeWithSize);
  });
  test('setPoint', () => {
    const rootPoint: Point = { x: 0, y: 0 };
    const child1Point: Point = { x: indent * m, y: body.height + m };
    const resultWithPoint: FlowNode = {
      ...nodeWithSize,
      point: rootPoint,
      children: [
        {
          ...child1,
          size: { body, tree: body },
          point: child1Point,
          children: [{ ...child2, children: [{ ...child3, children: [] }] }],
        },
      ],
    };
    expect(setPoint(nodeWithSize, settings, true, rootPoint)).toEqual(resultWithPoint);
  });
});

export {};
