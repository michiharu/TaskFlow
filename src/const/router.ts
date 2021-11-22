import { createMatchSelector } from 'connected-react-router';

import type { FlowPage, TopPage } from '../types/router';

export const topPage: TopPage = { path: '/TaskFlow/' };

const flowPath = '/TaskFlow/flow/:id';
export const flowPage: FlowPage = {
  path: flowPath,
  url: (params) => `/TaskFlow/flow/${params.id}`,
  matchSelector: createMatchSelector(flowPath),
};
