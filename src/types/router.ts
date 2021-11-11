import { matchSelectorFn } from 'connected-react-router';

import type { RootState } from './store';

export type Page = { path: string };
export type PageWithParams<Params extends { [K in keyof Params]?: string }> = {
  path: string;
  url: (params: Params) => string;
  matchSelector: matchSelectorFn<RootState, Params>;
};

export type TopPage = Page;
export type FlowPage = PageWithParams<{ id: string }>;
