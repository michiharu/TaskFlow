import { FlowEntity } from './flow-entity';

import { UUID } from '.';

export type FlowTree = { id: UUID; entities: FlowEntity[] };
export type FlowTreeState = { current?: UUID };
