import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import FlowRenderer from './FlowRenderer';

const PageRouter: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <div>トップ</div>
      </Route>
      <Route path="/flow">
        <FlowRenderer />
      </Route>
    </Switch>
  );
};

export default PageRouter;
