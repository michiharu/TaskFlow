import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';

import { entitySlice } from './flow-entity/slice';
import { flowSlice } from './flow/slice';
import { rootSaga } from './root-saga';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  flow: flowSlice.reducer,
  entity: entitySlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const setupStore = () => {
  const router = routerMiddleware(history);
  const saga = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefault) => getDefault({ thunk: false }).concat([router, saga]),
  });
  saga.run(rootSaga);
  return store;
};

export const store = setupStore();
