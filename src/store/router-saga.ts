/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { put, select, take } from '@redux-saga/core/effects';
import { createMatchSelector, LOCATION_CHANGE, push } from 'connected-react-router';

import { entitySlice } from './flow-entity/slice';
import { flowSelectors } from './flow/slice';
import { RootState } from './setup-store';

const flowMatcher = createMatchSelector<RootState, { id: string }>('/flow/:id');

export function* locationChange() {
  while (true) {
    yield take(LOCATION_CHANGE);
    const rootState: RootState = yield select((state) => state);
    const match = flowMatcher(rootState);
    if (!match || !match.isExact) continue;
    const flow = flowSelectors.selectById(rootState, match.params.id);
    if (!flow) {
      yield put(push('/'));
      continue;
    }
    yield put(entitySlice.actions.setFlow(flow));
  }
}
