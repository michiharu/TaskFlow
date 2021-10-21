/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { fork } from 'redux-saga/effects';

import * as FlowSaga from './flow/saga';

export function* rootSaga() {
  yield fork(FlowSaga.loadDataFromLocalStorage);
  yield fork(FlowSaga.handleAdd);
}
