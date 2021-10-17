import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import FlowEditor from './FlowEditor';
import FlowList from './FlowList';

const PageRouter: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <FlowList />
      </Route>
      <Route path="/flow">
        <FlowEditor />
      </Route>
    </Switch>
  );
};

export default PageRouter;
