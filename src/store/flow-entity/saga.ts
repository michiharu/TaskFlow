/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { put } from '@redux-saga/core/effects';

import { flowEntitySlice } from './slice';

export function* createTestTree() {
  yield put(flowEntitySlice.actions.createTestTree());
}
