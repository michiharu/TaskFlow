/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { fork } from 'redux-saga/effects';

import { createTestFlow } from './flow/saga';

export function* rootSaga() {
  yield fork(createTestFlow);
}
