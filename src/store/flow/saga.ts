/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { put, select, take } from '@redux-saga/core/effects';
import { PayloadAction as PA } from '@reduxjs/toolkit';

import type { Flow } from '../../types/flow';
import type { RootState } from '../../types/store';
import { entitySelectors } from '../flow-entity';

import { flowSelectors, flowSlice } from './slice';

const flowsKey = 'flows';

export function* load() {
  const flowsJson = localStorage.getItem(flowsKey);
  const flows = flowsJson ? (JSON.parse(flowsJson) as Flow[]) : [];
  yield put(flowSlice.actions.load(flows));
}

export function* add() {
  while (true) {
    const { payload: flow }: PA<Flow> = yield take(flowSlice.actions.add.toString());
    const flowsJson = localStorage.getItem(flowsKey);
    const flows = flowsJson ? (JSON.parse(flowsJson) as Flow[]) : [];
    localStorage.setItem(flowsKey, JSON.stringify(flows.concat(flow)));
  }
}

export function* sync() {
  while (true) {
    const { type }: { type: string } = yield take('*');
    if (type.startsWith('flow-entity')) {
      const state: RootState = yield select();
      const { flow } = state.entity;
      if (!flow) throw new Error();
      const entities = entitySelectors.selectAll(state);
      yield put(flowSlice.actions.set({ ...flow, entities }));
      const flows: Flow[] = yield select(flowSelectors.selectAll);
      localStorage.setItem(flowsKey, JSON.stringify(flows));
    }
  }
}
