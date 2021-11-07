import { createEntityAdapter, createSlice, Update, PayloadAction as PA } from '@reduxjs/toolkit';

import { uuid4 } from '../../funcs/utils';
import { Flow, FlowEntity, FlowState, Parent, RootState, UUID } from '../../types';

import { calcAddablePoints, entityFactory, setRect } from './funcs';

const adapter = createEntityAdapter<FlowEntity>({ sortComparer: (a, b) => a.index - b.index });
const initialState = adapter.getInitialState<FlowState>({ addablePoints: [] });
export type FlowEntitySliceState = typeof initialState;

export const entitySlice = createSlice({
  name: 'flow-entity',
  initialState,
  reducers: {
    setFlow(state, { payload: flow }: PA<Flow>) {
      // reset state
      adapter.removeAll(state);
      state.selected = undefined;

      const { id, title, rootId, entities } = flow;
      state.flow = { id, title, rootId };
      adapter.setAll(state, entities);

      const calculated = setRect(state);
      adapter.setAll(state, calculated);
      state.addablePoints = calcAddablePoints(calculated, state.selected);
    },
    add(state, { payload: parent }: PA<Omit<Parent, 'direction'>>) {
      const parentEntity = state.entities[parent.id];
      if (!parentEntity) throw new Error();
      const id = uuid4();
      parentEntity.childIds.splice(parent.index, 0, id);
      const entity = entityFactory(id, [], { open: false });
      adapter.addOne(state, entity);

      const calculated = setRect(state);
      adapter.setAll(state, calculated);
      state.addablePoints = calcAddablePoints(calculated, state.selected);
    },
    update(state, { payload }: PA<Update<FlowEntity>>) {
      adapter.updateOne(state, payload);

      const calculated = setRect(state);
      adapter.setAll(state, calculated);
      state.addablePoints = calcAddablePoints(calculated, state.selected);
    },
    delete(state, { payload: parent }: PA<Omit<Parent, 'direction'>>) {
      const parentEntity = state.entities[parent.id];
      if (!parentEntity) throw new Error();
      const id = parentEntity.childIds[parent.index];
      parentEntity.childIds.splice(parent.index, 1);
      adapter.removeOne(state, id);

      const calculated = setRect(state);
      adapter.setAll(state, calculated);
      state.addablePoints = calcAddablePoints(calculated, state.selected);
    },
    select(state, { payload: id }: PA<UUID | undefined>) {
      if (id) {
        state.selected = { id, status: 'selected' };
      } else {
        state.selected = undefined;
      }
    },
    editStart(state) {
      if (!state.selected) throw new Error();
      state.selected.status = 'editing';
    },
    editEnd(state) {
      if (!state.selected) throw new Error();
      state.selected.status = 'selected';
    },
    dragStart(state) {
      if (!state.selected) throw new Error();
      state.selected.status = 'dragging';
      const { id } = state.selected;
      adapter.updateOne(state, { id, changes: { open: false } });
      const calculated = setRect(state);
      adapter.setAll(state, calculated);
      state.addablePoints = calcAddablePoints(calculated, state.selected);
    },
    dragEnter(state, { payload: { parentId, index } }: PA<{ parentId: UUID; index: number }>) {
      if (!state.selected) throw new Error();
      const selectedEntity = state.entities[state.selected.id];
      if (!selectedEntity || !selectedEntity.parent) throw new Error();

      // move to
      const toParent = state.entities[parentId];
      if (!toParent) throw new Error();
      toParent.childIds.splice(index, 0, selectedEntity.id);

      // move from
      const fromParent = state.entities[selectedEntity.parent.id];
      if (!fromParent) throw new Error();
      const id = uuid4();
      state.selected.placeholderId = id;
      fromParent.childIds.splice(selectedEntity.parent.index, 1, id);
      const entity = entityFactory(id, [], { open: false });
      adapter.addOne(state, entity);
    },
    dragEnd(state) {
      if (!state.selected) throw new Error();
      state.selected.status = 'selected';
    },
  },
});

export const entitySelectors = adapter.getSelectors<RootState>((state) => state.entity);
