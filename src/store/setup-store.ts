import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';
import { treeSlice } from './tree/tree-slice';

export const rootReducer = combineReducers({
  tree: treeSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const setupStore = () => {
  const saga = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefault) => getDefault({ thunk: false }).concat(saga),
  });
  saga.run(rootSaga);
  return store;
};

export const store = setupStore();
