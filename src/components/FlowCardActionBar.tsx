import * as React from 'react';

import { SxProps } from '@mui/system';
import { Html } from 'react-konva-utils';

import { ThemeProvider, Box, IconButton } from '@mui/material';

import {
  Close as CloseIcon,
  Add as AddIcon,
  ArrowDownward as ArrowDownwardIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

import { iconPX } from '../const';
import { cardTheme } from '../theme';
import { FlowEntity, TreeSettings } from '../types/tree-node';

type Props = {
  entity: FlowEntity;
  settings: TreeSettings;
};

const FlowCardActionBar: React.FC<Props> = ({ entity, settings }) => {
  const { open, direction } = entity;
  const { bar } = settings;

  const buttonSx: SxProps = { position: 'absolute', top: bar.height / 2, transform: 'translate3d(-50%, -50%, 0)' };
  const transition = 'all 300ms 0s ease';
  const directionTransform = direction === 'horizontal' ? 'rotate(-90deg)' : undefined;

  return (
    <Html>
      <ThemeProvider theme={cardTheme}>
        <Box sx={{ width: 0, height: 0, position: 'relative' }}>
          <IconButton size="small" sx={{ ...buttonSx, left: iconPX * 0.5 + 4 }}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
          <IconButton size="small" sx={{ ...buttonSx, left: bar.width - iconPX * 2.5 - 4 }}>
            <AddIcon fontSize="inherit" />
          </IconButton>
          <IconButton size="small" sx={{ ...buttonSx, left: bar.width - iconPX * 1.5 - 4 }}>
            <ArrowDownwardIcon fontSize="inherit" sx={{ transition, transform: directionTransform }} />
          </IconButton>
          <IconButton size="small" sx={{ ...buttonSx, left: bar.width - iconPX * 0.5 - 4 }}>
            {open ? <ExpandLessIcon fontSize="inherit" /> : <ExpandMoreIcon fontSize="inherit" />}
          </IconButton>
        </Box>
      </ThemeProvider>
    </Html>
  );
};

export default FlowCardActionBar;
