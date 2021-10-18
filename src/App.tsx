import * as React from 'react';

import { Box, Container } from '@mui/material';

import PageRouter from './components/PageRouter';
import { containerMaxWidth } from './const';
import AppBar from './layouts/AppBar';

const App: React.FC = () => {
  return (
    <>
      <AppBar />
      <Container component="main" maxWidth={containerMaxWidth}>
        <Box sx={{ height: 'calc(100vh - 64px)' }}>
          <PageRouter />
        </Box>
      </Container>
    </>
  );
};

export default App;
