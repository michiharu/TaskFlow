import { createMatchSelector } from 'connected-react-router';

import { FlowPage, RootPage } from '../types/router';

export const rootPage: RootPage = { path: '/' };

const flowPath = '/flow/:id';
export const flowPage: FlowPage = {
  path: flowPath,
  url: (params) => `/flow/${params.id}`,
  matchSelector: createMatchSelector(flowPath),
};
