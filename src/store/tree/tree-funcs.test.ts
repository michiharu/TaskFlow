import { treeSettings as settings } from '../../const';
import { Size, UUID } from '../../types';
import { FlowEntity, FlowNode } from '../../types/tree-node';

import { entityToTree, setSize } from './tree-funcs';

const { body, indent, m } = settings;

const rootId = '12345678-9abc-4def-9000-000000000000' as UUID;
const rootEntity: FlowEntity = {
  id: rootId,
  type: 'root',
  index: 0,
  childIds: [],
  direction: 'vertical',
  open: true,
  text: { primary: '', secondary: '' },
};

const childId1 = '12345678-9abc-4def-9000-000000000001' as UUID;
const childId2 = '12345678-9abc-4def-9000-000000000002' as UUID;
// const childId3 = '12345678-9abc-4def-9000-000000000003' as UUID;
const entity: FlowEntity = {
  id: rootId,
  type: 'task',
  index: 0,
  childIds: [],
  direction: 'vertical',
  open: true,
  text: { primary: '', secondary: '' },
};

const noChildOpenTree: Size = {
  width: indent * m + body.width,
  height: body.height + m,
};

describe('root only', () => {
  const entities = { [rootId]: rootEntity };
  const node: FlowNode = { ...rootEntity, children: [] };
  test('entityToTree', () => {
    expect(entityToTree(rootId, entities)).toEqual(node);
  });
  test('setSize', () => {
    const result: FlowNode = { ...node, size: { body, tree: noChildOpenTree } };
    expect(setSize(node, settings, true)).toEqual(result);
  });
});

describe('root has children (flat, open)', () => {
  const entities = {
    [rootId]: { ...rootEntity, childIds: [childId1, childId2] },
    [childId1]: { ...entity, id: childId1 },
    [childId2]: { ...entity, id: childId2 },
  };
  const node: FlowNode = {
    ...rootEntity,
    childIds: [childId1, childId2],
    children: [
      { ...entity, id: childId1, children: [] },
      { ...entity, id: childId2, children: [] },
    ],
  };
  test('entityToTree', () => {
    expect(entityToTree(rootId, entities)).toEqual(node);
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
        {
          ...entity,
          id: childId1,
          size: { body, tree: noChildOpenTree },
          children: [],
        },
        {
          ...entity,
          id: childId2,
          size: { body, tree: noChildOpenTree },
          children: [],
        },
      ],
    };
    expect(setSize(node, settings, true)).toEqual(result);
  });
});

describe('root has children (nested)', () => {
  const entities = {
    [rootId]: { ...rootEntity, childIds: [childId1] },
    [childId1]: { ...entity, id: childId1, childIds: [childId2] },
    [childId2]: { ...entity, id: childId2, childIds: [] },
  };
  const node: FlowNode = {
    ...rootEntity,
    childIds: [childId1],
    children: [
      {
        ...entity,
        id: childId1,
        childIds: [childId2],
        children: [{ ...entity, id: childId2, childIds: [], children: [] }],
      },
    ],
  };
  test('entityToTree', () => {
    expect(entityToTree(rootId, entities)).toEqual(node);
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
          ...entity,
          id: childId1,
          size: { body, tree: child1TreeSize },
          childIds: [childId2],
          children: [
            {
              ...entity,
              id: childId2,
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
