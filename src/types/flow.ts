import type { UUID } from './common';
import type { FlowEntity } from './flow-entity';

export type Flow = {
  id: UUID;
  title: string;
  rootId: UUID;
  entities: FlowEntity[];
};
