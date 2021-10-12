import * as React from 'react';

import { Box, Container } from '@mui/material';

import PageRouter from './components/PageRouter';
import { containerMaxWidth } from './const';
import AppHeader from './layouts/AppHeader';

const App: React.FC = () => {
  return (
    <>
      <AppHeader />
      <Container component="main" maxWidth={containerMaxWidth}>
        <Box sx={{ height: 'calc(100vh - 64px)', p: 1 }}>
          <PageRouter />
        </Box>
      </Container>
    </>
  );
};

export default App;
