/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { fork } from 'redux-saga/effects';

import { testCreateTree } from './tree/tree-saga';

export function* rootSaga() {
  yield fork(testCreateTree);
}
