/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { put } from '@redux-saga/core/effects';

import { treeSlice } from './tree-slice';

export function* testCreateTree() {
  yield put(treeSlice.actions.createTree());
}
