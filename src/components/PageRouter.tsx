import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import { flowPage, rootPage } from '../const';

import FlowEditor from './FlowEditor';
import FlowList from './FlowList';

const PageRouter: React.FC = () => {
  return (
    <Switch>
      <Route path={rootPage.path} exact>
        <FlowList />
      </Route>
      <Route path={flowPage.path}>
        <FlowEditor />
      </Route>
    </Switch>
  );
};

export default PageRouter;
