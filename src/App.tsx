import * as React from 'react';

import PageRouter from './components/PageRouter';
import AppBar from './layouts/AppBar';

const App: React.FC = () => {
  return (
    <>
      <AppBar />
      <PageRouter />
    </>
  );
};

export default App;
