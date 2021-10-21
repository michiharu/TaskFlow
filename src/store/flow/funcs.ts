import { UUID } from '../../types';
import { Flow } from '../../types/flow';
import { entityFactory } from '../flow-entity/funcs';

export const flowFactory = (id: UUID, title: string): Flow => {
  const root = entityFactory(id, [], { type: 'root' });
  return { id: root.id, title, entities: [root] };
};
