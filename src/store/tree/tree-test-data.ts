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

export const rootHasFlatChildren = {
  root: { ...root, childIds: [childId1, childId2] },
  child1: { ...entity, id: childId1 },
  child2: { ...entity, id: childId2 },
};

export const rootHasNestedChildren = {
  root: { ...root, childIds: [childId1] },
  child1: { ...entity, id: childId1, childIds: [childId2] },
  child2: { ...entity, id: childId2 },
};
