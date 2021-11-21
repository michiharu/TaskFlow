import { PayloadAction as PA, Update, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { uuid4 } from '../../funcs/utils';
import { UUID } from '../../types/common';
import type { Flow } from '../../types/flow';
import type { FlowEntity, FlowState, Parent } from '../../types/flow-entity';
import type { RootState } from '../../types/store';

import { calculate, entityFactory } from './funcs';

export const adapter = createEntityAdapter<FlowEntity>();
const initialState = adapter.getInitialState<FlowState>({
  addablePoints: [],
  dropZones: [],
});
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

      calculate(state, adapter);
    },
    add(state, { payload: parent }: PA<Omit<Parent, 'direction'>>) {
      const parentEntity = state.entities[parent.id];
      if (!parentEntity) throw new Error();
      const newId = uuid4();
      parentEntity.childIds.splice(parent.index, 0, newId);
      const entity = entityFactory(newId, [], { open: false });
      adapter.addOne(state, entity);

      calculate(state, adapter);
    },
    update(state, { payload }: PA<Update<FlowEntity>>) {
      adapter.updateOne(state, payload);

      calculate(state, adapter);
    },
    delete(state, { payload: parent }: PA<Omit<Parent, 'direction'>>) {
      const parentEntity = state.entities[parent.id];
      if (!parentEntity) throw new Error();
      const id = parentEntity.childIds.splice(parent.index, 1)[0];
      adapter.removeOne(state, id);
      state.selected = undefined;
      calculate(state, adapter);
    },
    select(state, { payload: id }: PA<UUID | undefined>) {
      if (id) {
        state.selected = { id, status: 'selected' };
      } else {
        state.selected = undefined;
      }

      calculate(state, adapter);
    },
    editStart(state) {
      if (!state.selected) throw new Error();
      state.selected.status = 'editing';

      calculate(state, adapter);
    },
    editEnd(state) {
      if (!state.selected) throw new Error();
      state.selected.status = 'selected';

      calculate(state, adapter);
    },
    dragStart(state) {
      if (!state.selected) throw new Error();
      state.selected.status = 'dragging';
      const { id } = state.selected;
      adapter.updateOne(state, { id, changes: { open: false } });

      calculate(state, adapter);
    },
    dragEnter(state, { payload: parent }: PA<Omit<Parent, 'direction'>>) {
      if (!state.selected) throw new Error();
      const selectedEntity = state.entities[state.selected.id];
      if (!selectedEntity || !selectedEntity.parent) throw new Error();

      if (selectedEntity.parent.id === parent.id) {
        const parentEntity = state.entities[parent.id];
        if (!parentEntity) throw new Error();
        if (selectedEntity.parent.index < parent.index) {
          parentEntity.childIds.splice(parent.index, 0, selectedEntity.id);
          parentEntity.childIds.splice(selectedEntity.parent.index, 1);
        } else {
          parentEntity.childIds.splice(selectedEntity.parent.index, 1);
          parentEntity.childIds.splice(parent.index, 0, selectedEntity.id);
        }
      } else {
        // move to
        const toParent = state.entities[parent.id];
        if (!toParent) throw new Error();
        toParent.childIds.splice(parent.index, 0, selectedEntity.id);

        // move from
        const fromParent = state.entities[selectedEntity.parent.id];
        if (!fromParent) throw new Error();
        fromParent.childIds.splice(selectedEntity.parent.index, 1);
      }

      calculate(state, adapter);
    },
    dragEnd(state) {
      if (!state.selected) throw new Error();
      state.selected.status = 'moving';

      calculate(state, adapter);
    },
    finishMoving(state) {
      if (!state.selected) throw new Error();
      state.selected.status = 'selected';

      calculate(state, adapter);
    },
  },
});

export const entitySelectors = adapter.getSelectors<RootState>((state) => state.entity);
