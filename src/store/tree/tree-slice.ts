import { createEntityAdapter, createSlice, Update, PayloadAction as PA } from '@reduxjs/toolkit';

import { treeSettings as settings } from '../../const';
import { uuid4 } from '../../funcs/utils';
import { UUID } from '../../types';
import { FlowEntity, RootEntityState } from '../../types/tree-node';
import { RootState } from '../setup-store';

import { entityFactory, setRect } from './tree-funcs';
import { horizontalEntities } from './tree-test-data';

const adapter = createEntityAdapter<FlowEntity>({ sortComparer: (a, b) => a.index - b.index });
const initialState = adapter.getInitialState<RootEntityState>({ settings });
export type TreeEntityState = typeof initialState;

export const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    createTestTree(state) {
      // reset state
      adapter.removeAll(state);
      state.focus = undefined;
      state.dragging = undefined;

      const { root, child1, child2, child3 } = horizontalEntities;
      state.rootId = root.id;
      adapter.setAll(state, [root, child1, child2, child3]);

      const calculated = setRect(state);
      adapter.setAll(state, calculated);
    },
    addChild(state, { payload: parentId }: PA<UUID>) {
      const parent = state.entities[parentId];
      if (!parent) throw new Error();
      const id = uuid4();
      parent.childIds.unshift(id);
      const entity = entityFactory(id);
      adapter.addOne(state, entity);

      const calculated = setRect(state);
      adapter.setAll(state, calculated);
    },
    addNext(state, { payload: { parentId, targetId } }: PA<{ parentId: UUID; targetId: UUID }>) {
      const parent = state.entities[parentId];
      if (!parent) throw new Error();
      const id = uuid4();
      parent.childIds.splice(parent.childIds.indexOf(targetId) + 1, 0, id);
      const entity = entityFactory(id);
      adapter.addOne(state, entity);

      const calculated = setRect(state);
      adapter.setAll(state, calculated);
    },
    update(state, { payload }: PA<Update<FlowEntity>>) {
      adapter.updateOne(state, payload);

      const calculated = setRect(state);
      adapter.setAll(state, calculated);
    },
    delete(state, { payload: { parentId, targetId } }: PA<{ parentId: UUID; targetId: UUID }>) {
      const parent = state.entities[parentId];
      if (!parent) throw new Error();
      parent.childIds.splice(parent.childIds.indexOf(targetId), 1);
      adapter.removeOne(state, targetId);

      const calculated = setRect(state);
      adapter.setAll(state, calculated);
    },
  },
});

export default { treeSlice };

export const treeSelectors = adapter.getSelectors<RootState>((state) => state.tree);
