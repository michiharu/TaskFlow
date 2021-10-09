import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { treeSettings as settings } from '../../const';
import { FlowEntity, TreeRoot } from '../../types/tree-node';
import { RootState } from '../setup-store';

import { setRect } from './tree-funcs';
import { rootHasFlatChildren } from './tree-test-data';

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

      const { root, child1, child2 } = rootHasFlatChildren;
      state.rootId = root.id;
      adapter.setAll(state, [root, child1, child2]);

      const coordinated = setRect(state);
      console.log(coordinated);

      adapter.setAll(state, coordinated);
    },
  },
});

export default { treeSlice };

export const treeSelectors = adapter.getSelectors<RootState>((state) => state.tree);
