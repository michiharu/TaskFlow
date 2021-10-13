import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import FlowList from './FlowList';
import FlowRenderer from './FlowRenderer';

const PageRouter: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <FlowList />
      </Route>
      <Route path="/flow">
        <FlowRenderer />
      </Route>
    </Switch>
  );
};

export default PageRouter;
