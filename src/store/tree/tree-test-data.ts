import { UUID } from '../../types';
import { FlowEntity } from '../../types/tree-node';

const rootId = '12345678-9abc-4def-9000-000000000000' as UUID;
export const root: FlowEntity = {
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
const childId3 = '12345678-9abc-4def-9000-000000000003' as UUID;
export const entity: FlowEntity = {
  id: rootId,
  type: 'task',
  index: 0,
  childIds: [],
  direction: 'vertical',
  open: true,
  text: { primary: '', secondary: '' },
};

export const rootOnlyEntities = { root } as const;

export const flatChildren = {
  root: { ...root, childIds: [childId1, childId2] },
  child1: { ...entity, id: childId1 },
  child2: { ...entity, id: childId2 },
};

export const nestedChildren = {
  root: { ...root, childIds: [childId1] },
  child1: { ...entity, id: childId1, childIds: [childId2] },
  child2: { ...entity, id: childId2 },
};

export const closedChildren = {
  root: { ...root, childIds: [childId1, childId3] },
  child1: { ...entity, id: childId1, childIds: [childId2], open: false },
  child2: { ...entity, id: childId2 },
  child3: { ...entity, id: childId3, open: false },
};
