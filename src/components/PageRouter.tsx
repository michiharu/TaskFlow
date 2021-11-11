import * as React from 'react';

import { Route, Routes } from 'react-router-dom';

import { flowPage, topPage } from '../const';
import { FlowMain } from '../pages/flow';
import { TopMain } from '../pages/top';

const PageRouter: React.FC = () => (
  <Routes>
    <Route path={topPage.path} element={<TopMain />} />
    <Route path={flowPage.path} element={<FlowMain />} />
  </Routes>
);

export default PageRouter;
