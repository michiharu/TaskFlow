import { createEntityAdapter, createSlice, PayloadAction as PA } from '@reduxjs/toolkit';

import { Flow, FlowState } from '../../types/flow';
import { RootState } from '../setup-store';

const adapter = createEntityAdapter<Flow>();
const initialState = adapter.getInitialState<FlowState>({});
export type FlowTreeSliceState = typeof initialState;

export const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    load(state, { payload: flows }: PA<Flow[]>) {
      adapter.addMany(state, flows);
    },
    add(state, { payload: flow }: PA<Flow>) {
      adapter.addOne(state, flow);
    },
  },
});

export default { flowSlice };

export const flowSelectors = adapter.getSelectors<RootState>((state) => state.flow);
