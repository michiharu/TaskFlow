import * as React from 'react';

import { SxProps } from '@mui/system';
import { Html } from 'react-konva-utils';
import { useDispatch } from 'react-redux';

import { ThemeProvider, Box, IconButton } from '@mui/material';

import {
  Close as CloseIcon,
  Add as AddIcon,
  ArrowDownward as ArrowDownwardIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

import { cardActionBarHeight } from '../const';
import { treeSlice } from '../store/tree/tree-slice';
import { cardTheme } from '../theme';
import { FlowEntity, TreeSettings } from '../types/tree-node';

const iconArea = 26;
const mx = 4;

type Props = {
  entity: FlowEntity;
  settings: TreeSettings;
};

const FlowCardActionBar: React.FC<Props> = ({ entity, settings }) => {
  const { id, open, direction } = entity;
  const { card } = settings;
  const dispatch = useDispatch();

  const handleOpen = () => dispatch(treeSlice.actions.update({ id, changes: { open: !open } }));
  const handleChangeDirection = () => {
    const next = direction !== 'vertical' ? 'vertical' : 'horizontal';
    dispatch(treeSlice.actions.update({ id, changes: { direction: next } }));
  };

  const buttonSx: SxProps = {
    position: 'absolute',
    top: cardActionBarHeight / 2,
    transform: 'translate3d(-50%, -50%, 0)',
  };
  const transition = 'all 300ms 0s ease';
  const directionTransform = direction === 'horizontal' ? 'rotate(-90deg)' : undefined;

  return (
    <Html>
      <ThemeProvider theme={cardTheme}>
        <Box sx={{ width: 0, height: 0, position: 'relative' }}>
          <IconButton size="small" sx={{ ...buttonSx, left: iconArea * 0.5 + mx }}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
          <IconButton size="small" sx={{ ...buttonSx, left: card.width - iconArea * 2.5 - mx }}>
            <AddIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ ...buttonSx, left: card.width - iconArea * 1.5 - mx }}
            onClick={handleChangeDirection}
          >
            <ArrowDownwardIcon fontSize="inherit" sx={{ transition, transform: directionTransform }} />
          </IconButton>
          <IconButton size="small" sx={{ ...buttonSx, left: card.width - iconArea * 0.5 - mx }} onClick={handleOpen}>
            {open ? <ExpandLessIcon fontSize="inherit" /> : <ExpandMoreIcon fontSize="inherit" />}
          </IconButton>
        </Box>
      </ThemeProvider>
    </Html>
  );
};

export default FlowCardActionBar;
