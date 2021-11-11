import { PayloadAction as PA, Update, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { uuid4 } from '../../funcs/utils';
import { UUID } from '../../types/common';
import type { Flow } from '../../types/flow';
import type { FlowEntity, FlowState, Parent } from '../../types/flow-entity';
import type { RootState } from '../../types/store';

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
      const newId = uuid4();
      parentEntity.childIds.splice(parent.index, 0, newId);
      const entity = entityFactory(newId, [], { open: false });
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
      const id = parentEntity.childIds.splice(parent.index, 1)[0];
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

        if (!state.selected.placeholder) {
          // set placeholder
          const id = uuid4();
          state.selected.placeholder = { id, parentId: selectedEntity.parent.id };
          fromParent.childIds.splice(selectedEntity.parent.index, 1, id);
          const entity = entityFactory(id, [], { open: false });
          adapter.addOne(state, entity);
        } else {
          // remove childId
          fromParent.childIds.splice(selectedEntity.parent.index, 1);
        }
      }

      const calculated = setRect(state);
      adapter.setAll(state, calculated);
      state.addablePoints = calcAddablePoints(calculated, state.selected);
    },
    dragEnd(state) {
      if (!state.selected) throw new Error();
      state.selected.status = 'moving';

      const { placeholder } = state.selected;
      if (placeholder) {
        const parent = state.entities[placeholder.parentId];
        if (!parent) throw new Error();
        parent.childIds.splice(parent.childIds.indexOf(placeholder.id), 1);
        adapter.removeOne(state, placeholder.id);
        state.selected.placeholder = undefined;
      }

      const calculated = setRect(state);
      adapter.setAll(state, calculated);
      state.addablePoints = calcAddablePoints(calculated, state.selected);
    },
    finishMoving(state) {
      if (!state.selected) throw new Error();
      state.selected.status = 'selected';
    },
  },
});

export const entitySelectors = adapter.getSelectors<RootState>((state) => state.entity);
