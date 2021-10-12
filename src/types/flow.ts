import { FlowEntity } from './flow-entity';

import { UUID } from '.';

export type Flow = { id: UUID; entities: FlowEntity[] };
export type FlowState = { current?: UUID };
