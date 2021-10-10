import * as React from 'react';

import * as Konva from 'konva';
import { Group, Rect } from 'react-konva';
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

const FlowCard: React.FC<Props> = ({ entity, settings }) => {
  const { point, tree, open, direction } = entity;
  const { card, bar } = settings;
  const rootRef = React.useRef<Konva.default.Group>(null);
  const cardRef = React.useRef<Konva.default.Rect>(null);
  if (!point || !tree) return null;

  return (
    <Group ref={rootRef} {...point}>
      <Rect ref={cardRef} {...tree} fill="#0af1" />
      <Rect {...card} fill="#aaa1" />
      <Html>
        <ThemeProvider theme={cardTheme}>
          <Box sx={{ width: 0, height: 0, position: 'relative' }}>
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                top: bar.height / 2,
                left: iconPX * 0.5 + 4,
                transform: 'translate3d(-50%, -50%, 0)',
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                top: bar.height / 2,
                left: card.width - iconPX * 2.5 - 4,
                transform: 'translate3d(-50%, -50%, 0)',
              }}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                top: bar.height / 2,
                left: card.width - iconPX * 1.5 - 4,
                transform: 'translate3d(-50%, -50%, 0)',
              }}
            >
              <ArrowDownwardIcon
                sx={{
                  transition: 'all 300ms 0s ease',
                  transform: direction === 'horizontal' ? 'rotate(-90deg)' : undefined,
                }}
                fontSize="inherit"
              />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                top: bar.height / 2,
                left: card.width - iconPX * 0.5 - 4,
                transform: 'translate3d(-50%, -50%, 0)',
              }}
            >
              {open ? <ExpandLessIcon fontSize="inherit" /> : <ExpandMoreIcon fontSize="inherit" />}
            </IconButton>
          </Box>
        </ThemeProvider>
      </Html>
      <Rect {...bar} fill="#6666" />
    </Group>
  );
};

export default FlowCard;
