/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { put, select, take } from '@redux-saga/core/effects';
import { LOCATION_CHANGE, push } from 'connected-react-router';

import { flowPage } from '../const/router';
import { RootState } from '../types/store';

import { entitySlice } from './flow-entity/slice';
import { flowSelectors } from './flow/slice';

export function* locationChange() {
  while (true) {
    yield take(LOCATION_CHANGE);
    const rootState: RootState = yield select();
    const match = flowPage.matchSelector(rootState);
    if (!match || !match.isExact) continue;
    const flow = flowSelectors.selectById(rootState, match.params.id);
    if (!flow) {
      yield put(push('/'));
      continue;
    }
    yield put(entitySlice.actions.setFlow(flow));
  }
}
