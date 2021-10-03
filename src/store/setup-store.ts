import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import treeSlice from './tree-slice';

export const rootReducer = combineReducers({
  tree: treeSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setupStore = () => {
  const saga = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefault) => getDefault({ thunk: false }).concat(saga),
  });
  return store;
};
