/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { put, select } from '@redux-saga/core/effects';

import { Flow } from '../../types/flow';
import { entitySlice } from '../flow-entity/slice';

import { flowSelectors, flowSlice } from './slice';

export function* createTestFlow() {
  yield put(flowSlice.actions.create('test'));
  const flows: Flow[] = yield select(flowSelectors.selectAll);
  yield put(entitySlice.actions.setFlow(flows[0]));
}
