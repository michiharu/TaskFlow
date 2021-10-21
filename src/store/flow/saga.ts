/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { put, take } from '@redux-saga/core/effects';
import { PayloadAction as PA } from '@reduxjs/toolkit';

import { Flow } from '../../types/flow';

import { flowSlice } from './slice';

const flowsKey = 'flows';

export function* loadDataFromLocalStorage() {
  const flowsJson = localStorage.getItem(flowsKey);
  const flows = flowsJson ? (JSON.parse(flowsJson) as Flow[]) : [];
  yield put(flowSlice.actions.load(flows));
}

export function* handleAdd() {
  while (true) {
    const { payload: flow }: PA<Flow> = yield take(flowSlice.actions.add.toString());
    const flowsJson = localStorage.getItem(flowsKey);
    const flows = flowsJson ? (JSON.parse(flowsJson) as Flow[]) : [];
    localStorage.setItem(flowsKey, JSON.stringify(flows.concat(flow)));
  }
}
