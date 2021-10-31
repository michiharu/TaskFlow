import * as React from 'react';

import { SxProps } from '@mui/system';
import { Html } from 'react-konva-utils';
import { useDispatch } from 'react-redux';

import { ThemeProvider, Box, IconButton, IconButtonProps, Badge } from '@mui/material';

import {
  Close as CloseIcon,
  Add as AddIcon,
  ArrowDownward as ArrowDownwardIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

import { cardActionBarHeight as barHeight, cardActionTheme, entitySettings as settings } from '../const';
import { entitySlice } from '../store/flow-entity';
import { FlowEntity } from '../types';

const iconArea = 26;
const mx = 4;
const { card, indent, m } = settings;

type Props = {
  entity: FlowEntity;
};

const FlowCardActionBar: React.FC<Props> = ({ entity }) => {
  const dispatch = useDispatch();
  const { id, parent, type, tree, open, direction, childIds } = entity;
  if (!tree) return null;

  const buttonSx: SxProps = { position: 'absolute', top: barHeight / 2, transform: 'translate3d(-50%, -50%, 0)' };
  const transition = 'all 300ms 0s ease';
  const directionTransform = direction === 'horizontal' ? 'rotate(-90deg)' : undefined;

  const directionIconButtonProps: IconButtonProps = {
    size: 'small',
    sx: { ...buttonSx, left: card.width - iconArea * 1.5 - mx },
    onClick: () => {
      const next = direction !== 'vertical' ? 'vertical' : 'horizontal';
      dispatch(entitySlice.actions.update({ id, changes: { direction: next } }));
    },
  };
  const directionIconButton = (
    <IconButton {...directionIconButtonProps}>
      <ArrowDownwardIcon fontSize="inherit" sx={{ transition, transform: directionTransform }} />
    </IconButton>
  );
  const openCloseIconButtonProps: IconButtonProps = {
    size: 'small',
    sx: { ...buttonSx, left: card.width - iconArea * 0.5 - mx },
    onClick: () => dispatch(entitySlice.actions.update({ id, changes: { open: !open } })),
  };
  const openCloseIconButton = (
    <IconButton {...openCloseIconButtonProps}>
      {open ? (
        <ExpandLessIcon fontSize="inherit" />
      ) : childIds.length !== 0 ? (
        <Badge color="primary" variant="dot">
          <ExpandMoreIcon fontSize="inherit" />
        </Badge>
      ) : (
        <ExpandMoreIcon fontSize="inherit" />
      )}
    </IconButton>
  );
  const addChildIconButtonProps: IconButtonProps = {
    size: 'small',
    sx: {
      position: 'absolute',
      top: direction === 'vertical' ? card.height + m / 2 : indent * m + card.height / 2,
      left: direction === 'vertical' ? indent * m + card.width / 2 : card.width + m / 2,
      transform: 'translate3d(-50%, -50%, 0)',
    },
    onClick: () => dispatch(entitySlice.actions.addChild(id)),
  };
  const addChildIconButton = open && (
    <IconButton {...addChildIconButtonProps}>
      <AddIcon fontSize="inherit" />
    </IconButton>
  );

  if (type === 'root') {
    return (
      <Html>
        <ThemeProvider theme={cardActionTheme}>
          <Box sx={{ width: 0, height: 0, position: 'relative' }}>
            {directionIconButton}
            {openCloseIconButton}
            {addChildIconButton}
          </Box>
        </ThemeProvider>
      </Html>
    );
  }
  if (!parent) throw new Error();

  const closeIconButtonProps: IconButtonProps = {
    size: 'small',
    sx: { ...buttonSx, left: iconArea * 0.5 + mx },
    onClick: () => dispatch(entitySlice.actions.delete({ parentId: parent.id, targetId: id })),
  };
  const closeIconButton = (
    <IconButton {...closeIconButtonProps}>
      <CloseIcon fontSize="inherit" />
    </IconButton>
  );
  const addNextIconButtonProps: IconButtonProps = {
    size: 'small',
    sx: {
      position: 'absolute',
      top: parent.direction === 'vertical' ? tree.height + m / 2 : card.height / 2,
      left: parent.direction === 'vertical' ? card.width / 2 : tree.width + m / 2,
      transform: 'translate3d(-50%, -50%, 0)',
    },
    onClick: () => dispatch(entitySlice.actions.addNext({ parentId: parent.id, targetId: id })),
  };
  const addNextIconButton = (
    <IconButton {...addNextIconButtonProps}>
      <AddIcon fontSize="inherit" />
    </IconButton>
  );

  return (
    <Html>
      <ThemeProvider theme={cardActionTheme}>
        <Box sx={{ width: 0, height: 0, position: 'relative' }}>
          {closeIconButton}
          {directionIconButton}
          {openCloseIconButton}
          {addChildIconButton}
          {addNextIconButton}
        </Box>
      </ThemeProvider>
    </Html>
  );
};

export default FlowCardActionBar;
