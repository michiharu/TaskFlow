import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import { flowPage, topPage } from '../const';
import { FlowMain } from '../pages/flow';
import { TopMain } from '../pages/top';

const PageRouter: React.FC = () => (
  <Switch>
    <Route path={topPage.path} exact>
      <TopMain />
    </Route>
    <Route path={flowPage.path}>
      <FlowMain />
    </Route>
  </Switch>
);

export default PageRouter;
