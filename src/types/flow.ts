import { FlowEntity } from './flow-entity';

import { UUID } from '.';

export type Flow = { id: UUID; title: string; entities: FlowEntity[] };
