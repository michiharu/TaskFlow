/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { put, select } from '@redux-saga/core/effects';

import { FlowTree } from '../../types/flow-tree';
import { entitySlice } from '../flow-entity/slice';

import { treeSelectors, treeSlice } from './slice';

export function* createTestTree() {
  yield put(treeSlice.actions.create('test'));
  const trees: FlowTree[] = yield select(treeSelectors.selectAll);
  yield put(entitySlice.actions.setFlowTree(trees[0]));
}
