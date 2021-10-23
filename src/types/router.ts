import { matchSelectorFn } from 'connected-react-router';

import { RootState } from '.';

export type Page = { path: string };
export type PageWithParams<Params extends { [K in keyof Params]?: string }> = {
  path: string;
  url: (params: Params) => string;
  matchSelector: matchSelectorFn<RootState, Params>;
};

export type RootPage = Page;
export type FlowPage = PageWithParams<{ id: string }>;
