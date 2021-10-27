import { createEntityAdapter, createSlice, Update, PayloadAction as PA } from '@reduxjs/toolkit';

import { uuid4 } from '../../funcs/utils';
import { Flow, FlowEntity, FlowState, RootState, UUID } from '../../types';

import { entityFactory, setRect } from './funcs';

const adapter = createEntityAdapter<FlowEntity>({ sortComparer: (a, b) => a.index - b.index });
const initialState = adapter.getInitialState<FlowState>({});
export type FlowEntitySliceState = typeof initialState;

export const entitySlice = createSlice({
  name: 'flow-entity',
  initialState,
  reducers: {
    setFlow(state, { payload: flow }: PA<Flow>) {
      // reset state
      adapter.removeAll(state);
      state.focus = undefined;
      state.dragging = undefined;

      const { id, title, rootId, entities } = flow;
      state.flow = { id, title, rootId };
      adapter.setAll(state, entities);

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

export const entitySelectors = adapter.getSelectors<RootState>((state) => state.entity);
