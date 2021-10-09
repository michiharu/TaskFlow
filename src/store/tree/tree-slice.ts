import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { treeSettings as settings } from '../../const';
import { uuid4 } from '../../funcs/utils';
import { FlowEntity, TreeRoot } from '../../types/tree-node';
import { RootState } from '../setup-store';

import { setRect, rootFactory, taskFactory } from './tree-funcs';

const adapter = createEntityAdapter<FlowEntity>({ sortComparer: (a, b) => a.index - b.index });
const initialState = adapter.getInitialState<TreeRoot>({ settings });
export type TreeEntityState = typeof initialState;

export const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    createTree(state) {
      // reset state
      adapter.removeAll(state);
      state.focus = undefined;
      state.dragging = undefined;

      const rootId = uuid4();
      state.rootId = rootId;

      // const childId1 = uuid4();
      // const childId2 = uuid4();
      // const childId3 = uuid4();
      // const childId4 = uuid4();
      // const childId5 = uuid4();

      // const root = rootFactory(rootId, [childId1, childId2], 'start');
      // const child1 = taskFactory(childId1, [childId3], '1');
      // const child3 = taskFactory(childId3, [childId4, childId5], '3');
      // const child4 = taskFactory(childId4, [], '4');
      // const child5 = taskFactory(childId5, [], '5');
      // const child2 = taskFactory(childId2, [], '2');
      // adapter.setAll(state, [root, child1, child2, { ...child3, direction: 'horizontal' }, child4, child5]);

      const childId1 = uuid4();
      const childId2 = uuid4();

      const root = rootFactory(rootId, [childId1], 'start');
      const child1 = taskFactory(childId1, [childId2], '1');
      const child2 = taskFactory(childId2, [], '2');
      adapter.setAll(state, [root, child1, child2]);

      const coordinated = setRect(state);
      console.log(coordinated);

      adapter.setAll(state, coordinated);
    },
  },
});

export default { treeSlice };

export const treeSelectors = adapter.getSelectors<RootState>((state) => state.tree);
