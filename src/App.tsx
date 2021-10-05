import * as React from 'react';

import { Layer, Rect } from 'react-konva';

import { Box, Container } from '@mui/material';

import FlexibleStage from './components/FlexibleStage';
import { containerMaxWidth } from './const';
import AppHeader from './layouts/AppHeader';

const App: React.FC = () => {
  return (
    <>
      <AppHeader />
      <Container component="main" maxWidth={containerMaxWidth}>
        <Box sx={{ height: 'calc(100vh - 64px)', p: 1 }}>
          <FlexibleStage stageSize={{ width: 5000, height: 5000 }}>
            <Layer>
              <Rect width={100} height={20} fill="#fff" />
            </Layer>
          </FlexibleStage>
        </Box>
      </Container>
    </>
  );
};

export default App;
