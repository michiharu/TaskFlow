import { createEntityAdapter, createSlice, PayloadAction as PA } from '@reduxjs/toolkit';

import { uuid4 } from '../../funcs/utils';
import { Flow, FlowState } from '../../types/flow';
import { entityFactory } from '../flow-entity/funcs';
import { RootState } from '../setup-store';

const adapter = createEntityAdapter<Flow>();
const initialState = adapter.getInitialState<FlowState>({});
export type FlowTreeSliceState = typeof initialState;

export const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    create(state, { payload: primary }: PA<string>) {
      const id = uuid4();
      const root = entityFactory(id, [], { type: 'root' });
      root.text.primary = primary;
      const flow: Flow = { id: root.id, entities: [root] };
      adapter.addOne(state, flow);
    },
  },
});

export default { flowSlice };

export const flowSelectors = adapter.getSelectors<RootState>((state) => state.flow);
