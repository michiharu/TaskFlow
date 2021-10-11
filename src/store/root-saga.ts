/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { fork } from 'redux-saga/effects';

import { createTestTree } from './flow-tree/saga';

export function* rootSaga() {
  yield fork(createTestTree);
}
