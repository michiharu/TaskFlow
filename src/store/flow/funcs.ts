import { uuid4 } from '../../funcs/utils';
import { Flow } from '../../types/flow';
import { entityFactory } from '../flow-entity/funcs';

export const flowFactory = (title: string): Flow => {
  const id = uuid4();
  const rootId = uuid4();
  const root = entityFactory(rootId, [], { type: 'root' });
  return { id, title, rootId, entities: [root] };
};
