import { createMatchSelector } from 'connected-react-router';

import { FlowPage, TopPage } from '../types';

export const topPage: TopPage = { path: '/' };

const flowPath = '/flow/:id';
export const flowPage: FlowPage = {
  path: flowPath,
  url: (params) => `/flow/${params.id}`,
  matchSelector: createMatchSelector(flowPath),
};
