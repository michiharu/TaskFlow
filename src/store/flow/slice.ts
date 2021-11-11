import { PayloadAction as PA, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import type { Flow } from '../../types/flow';
import type { RootState } from '../../types/store';

const adapter = createEntityAdapter<Flow>();
const initialState = adapter.getInitialState();
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
    set(state, { payload: flow }: PA<Flow>) {
      adapter.setOne(state, flow);
    },
  },
});

export const flowSelectors = adapter.getSelectors<RootState>((state) => state.flow);
