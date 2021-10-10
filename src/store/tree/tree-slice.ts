import { createEntityAdapter, createSlice, Update, PayloadAction as PA } from '@reduxjs/toolkit';

import { treeSettings as settings } from '../../const';
import { FlowEntity, TreeRoot } from '../../types/tree-node';
import { RootState } from '../setup-store';

import { setRect } from './tree-funcs';
import { horizontalEntities } from './tree-test-data';

const adapter = createEntityAdapter<FlowEntity>({ sortComparer: (a, b) => a.index - b.index });
const initialState = adapter.getInitialState<TreeRoot>({ settings });
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
    update(state, { payload: entity }: PA<Update<FlowEntity>>) {
      adapter.updateOne(state, entity);
      const calculated = setRect(state);
      adapter.setAll(state, calculated);
    },
  },
});

export default { treeSlice };

export const treeSelectors = adapter.getSelectors<RootState>((state) => state.tree);
