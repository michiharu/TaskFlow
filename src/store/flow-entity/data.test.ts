import { UUID } from '../../types';
import { FlowEntity } from '../../types/flow-entity';

import { entityFactory } from './funcs';

export const rootId = '12345678-9abc-4def-9000-000000000000' as UUID;
const childId1 = '12345678-9abc-4def-9000-000000000001' as UUID;
const childId2 = '12345678-9abc-4def-9000-000000000002' as UUID;
const childId3 = '12345678-9abc-4def-9000-000000000003' as UUID;

type Entities = { [key in string]: FlowEntity };

export const rootOnlyEntities: Entities = { root: entityFactory(rootId, [], { type: 'root' }) };

export const flatEntities: Entities = {
  root: entityFactory(rootId, [childId1, childId2, childId3], { type: 'root' }),
  child1: entityFactory(childId1),
  child2: entityFactory(childId2),
  child3: entityFactory(childId3),
};

export const nestedEntities: Entities = {
  root: entityFactory(rootId, [childId1], { type: 'root' }),
  child1: entityFactory(childId1, [childId2]),
  child2: entityFactory(childId2, [childId3]),
  child3: entityFactory(childId3),
};

export const closedEntities: Entities = {
  root: entityFactory(rootId, [childId1, childId3], { type: 'root' }),
  child1: entityFactory(childId1, [childId2], { open: false }),
  child2: entityFactory(childId2),
  child3: entityFactory(childId3, [], { open: false }),
};

export const horizontalEntities: Entities = {
  root: entityFactory(rootId, [childId1, childId3], { type: 'root', direction: 'horizontal' }),
  child1: entityFactory(childId1, [childId2], { direction: 'horizontal' }),
  child2: entityFactory(childId2),
  child3: entityFactory(childId3, [], { direction: 'horizontal' }),
};

export const nestedClosedEntities: Entities = {
  root: entityFactory(rootId, [childId1], { type: 'root' }),
  child1: entityFactory(childId1, [childId2], { open: false }),
  child2: entityFactory(childId2, [childId3]),
  child3: entityFactory(childId3),
};
