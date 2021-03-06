/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { fork } from 'redux-saga/effects';

import * as FlowSaga from './flow/saga';
import * as Router from './router-saga';

export function* rootSaga() {
  yield fork(Router.locationChange);
  yield fork(FlowSaga.load);
  yield fork(FlowSaga.add);
  yield fork(FlowSaga.sync);
}
