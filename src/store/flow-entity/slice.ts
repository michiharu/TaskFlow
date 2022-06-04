import { PayloadAction as PA, Update, createEntityAdapter, createSlice, current } from '@reduxjs/toolkit';

import { uuid4 } from '../../funcs/utils';
import { UUID } from '../../types/common';
import type { Flow } from '../../types/flow';
import type { DropZone, FlowEntity, FlowState, Parent } from '../../types/flow-entity';
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
    add(state, { payload: parent }: PA<Parent>) {
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
    delete(state, { payload: parent }: PA<Parent>) {
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
    dragMoveReset(state) {
      // reset reserved
      state.ids.forEach((id) => {
        const entity = state.entities[id];
        if (!entity) throw new Error();
        entity.reserved = undefined;
      });

      calculate(state, adapter);
    },
    dragMoveReserve(state, { payload: { from, reservedType } }: PA<DropZone>) {
      // reset reserved
      state.ids.forEach((id) => {
        const entity = state.entities[id];
        if (!entity) throw new Error();
        entity.reserved = undefined;
      });

      const entity = state.entities[from];
      if (!entity) throw new Error();
      entity.reserved = reservedType;

      calculate(state, adapter);
    },
    dragEnd(state) {
      if (!state.selected) throw new Error();
      state.selected.status = 'moving';
      const selectedEntity = state.entities[state.selected.id];
      if (!selectedEntity || !selectedEntity.parent) throw new Error();

      const reserves = state.ids.filter((id) => state.entities[id]?.reserved);
      if (reserves.length > 1) throw new Error();
      if (reserves.length === 1) {
        const reservedEntity = state.entities[reserves[0]];
        if (!reservedEntity) throw new Error();
        if (reservedEntity.reserved === 'first') {
          // move to first of root
          reservedEntity.childIds.splice(0, 0, selectedEntity.id);

          // move from
          const selectedParentEntity = state.entities[selectedEntity.parent.id];
          if (!selectedParentEntity) throw new Error();
          if (reservedEntity.id === selectedEntity.parent.id) {
            selectedParentEntity.childIds.splice(selectedEntity.parent.index + 1, 1);
          } else {
            selectedParentEntity.childIds.splice(selectedEntity.parent.index, 1);
          }
        } else {
          // reservedEntity.reserved === 'next'
          const { parent } = reservedEntity;
          if (!parent) throw new Error();
          const reservedParentEntity = state.entities[parent.id];
          if (!reservedParentEntity) throw new Error();

          // move to
          reservedParentEntity.childIds.splice(parent.index + 1, 0, selectedEntity.id);

          // move from
          const isOlderSibling = selectedEntity.parent.id === parent.id && selectedEntity.parent.index > parent.index;
          const removeIndex = selectedEntity.parent.index + (isOlderSibling ? 1 : 0);
          const selectedParentEntity = state.entities[selectedEntity.parent.id];
          if (!selectedParentEntity) throw new Error();
          selectedParentEntity.childIds.splice(removeIndex, 1);
        }
      }

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
