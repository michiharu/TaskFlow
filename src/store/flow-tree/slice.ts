import { createEntityAdapter, createSlice, PayloadAction as PA } from '@reduxjs/toolkit';

import { uuid4 } from '../../funcs/utils';
import { FlowTree, FlowTreeState } from '../../types/flow-tree';
import { entityFactory } from '../flow-entity/funcs';
import { RootState } from '../setup-store';

const adapter = createEntityAdapter<FlowTree>();
const initialState = adapter.getInitialState<FlowTreeState>({});
export type FlowTreeSliceState = typeof initialState;

export const treeSlice = createSlice({
  name: 'flow-tree',
  initialState,
  reducers: {
    create(state, { payload: primary }: PA<string>) {
      const id = uuid4();
      const root = entityFactory(id, [], { type: 'root' });
      root.text.primary = primary;
      const tree: FlowTree = { id: root.id, entities: [root] };
      adapter.addOne(state, tree);
    },
  },
});

export default { treeSlice };

export const treeSelectors = adapter.getSelectors<RootState>((state) => state.tree);
