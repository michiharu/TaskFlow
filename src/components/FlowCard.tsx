import * as React from 'react';

import { SxProps } from '@mui/system';
import Konva from 'konva';
import { Group, Rect, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import { useDispatch } from 'react-redux';

import { Badge, Box, Button, IconButton, IconButtonProps, TextField, ThemeProvider } from '@mui/material';

import {
  Add as AddIcon,
  ArrowDownward as ArrowDownwardIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

import { cardActionTheme, entitySettings } from '../const';
import { entitySlice } from '../store/flow-entity';
import { FlowEntity, Point, SelectedStatus } from '../types';

const { card, indent, m } = entitySettings;
const space = 7;
const margin = 4;
const boxBgcolor = '#444a';

type Props = {
  entity: FlowEntity;
  selected?: SelectedStatus;
};

const FlowCard: React.FC<Props> = ({ entity, selected }) => {
  const dispatch = useDispatch();
  const { id, parent, point, tree, open, direction, childIds, text } = entity;
  const rootGroupRef = React.useRef<Konva.Group>(null);
  const pointRef = React.useRef<Point>();
  if (!point || !tree) return null;

  if (!pointRef.current) {
    pointRef.current = point;
  }

  React.useEffect(() => {
    if (pointRef.current && (pointRef.current.x !== point.x || pointRef.current.y !== point.y)) {
      rootGroupRef.current?.to({ ...point, easing: Konva.Easings.EaseInOut });
      pointRef.current = point;
    }
  }, [point.x, point.y]);

  const rootGroupProps: React.ComponentProps<typeof Group> = { ...pointRef.current, ref: rootGroupRef };
  const treeProps: React.ComponentProps<typeof Rect> = {
    ...tree,
    onMouseEnter() {
      if (selected && selected.status === 'selected') {
        dispatch(entitySlice.actions.select(undefined));
      }
    },
  };
  const cardGroupProps: React.ComponentProps<typeof Group> = {
    onMouseEnter() {
      if (!selected || selected.status === 'selected') {
        dispatch(entitySlice.actions.select(id));
      }
    },
  };
  const cardProps: React.ComponentProps<typeof Rect> = { ...card };
  const textProps: React.ComponentProps<typeof Text> = {
    text,
    fontSize: 14,
    lineHeight: 1.43,
    x: space,
    y: space,
    width: card.width - space * 2,
    height: card.height - space * 1.5,
  };

  const textElement = !(selected?.id === id && selected.status === 'editing') && <Text {...textProps} fill="#fff" />;

  const textField = selected?.id === id && selected.status === 'editing' && (
    <TextField
      variant="standard"
      sx={{ position: 'absolute', left: 0, top: 0, width: card.width, height: card.height }}
      InputProps={{ sx: { px: 0.87, py: 0.8, fontSize: 14 } }}
      multiline
      rows={4}
      value={text}
      onChange={(e) => dispatch(entitySlice.actions.update({ id, changes: { text: e.target.value } }))}
      onKeyDown={(e) => {
        if (e.code === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) dispatch(entitySlice.actions.editEnd());
      }}
    />
  );

  const saveButton = selected?.id === id && selected.status === 'editing' && (
    <Button
      variant="contained"
      size="small"
      sx={{
        position: 'absolute',
        left: card.width,
        top: card.height + 6,
        transform: 'translate3d(-100%, 0, 0)',
      }}
      onClick={() => dispatch(entitySlice.actions.editEnd())}
    >
      OK
    </Button>
  );

  const editorBoxProps: SxProps = {
    position: 'absolute',
    left: card.width - margin,
    top: margin,
    transform: 'translate3d(-100%, 0, 0)',
    p: 0.5,
    bgcolor: boxBgcolor,
    borderRadius: 1,
  };

  const editIconButtonProps: IconButtonProps = {
    size: 'small',
    onClick: () => {
      dispatch(entitySlice.actions.editStart());
    },
  };
  const editButtonBox = selected?.id === id && selected.status === 'selected' && (
    <Box sx={editorBoxProps}>
      <IconButton {...editIconButtonProps}>
        <EditIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );

  const transition = 'all 300ms 0s ease';
  const directionTransform = direction === 'horizontal' ? 'rotate(-90deg)' : undefined;
  const directionIconButtonProps: IconButtonProps = {
    size: 'small',
    sx: { mr: 0.5 },
    onClick: () => {
      const next = direction !== 'vertical' ? 'vertical' : 'horizontal';
      dispatch(entitySlice.actions.update({ id, changes: { direction: next } }));
    },
  };
  const directionIconButton = selected?.id === id && selected.status === 'selected' && open && (
    <IconButton {...directionIconButtonProps}>
      <ArrowDownwardIcon fontSize="inherit" sx={{ transition, transform: directionTransform }} />
    </IconButton>
  );
  const openCloseIconButtonProps: IconButtonProps = {
    size: 'small',
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

  const displayBoxProps: SxProps = {
    position: 'absolute',
    left: card.width - margin,
    top: card.height - margin,
    transform: 'translate3d(-100%, -100%, 0)',
    display: 'flex',
    p: 0.5,
    bgcolor: boxBgcolor,
    borderRadius: 1,
  };

  const displayBox = ((selected?.status !== 'editing' && !open && childIds.length !== 0) ||
    (selected?.id === id && selected.status === 'selected')) && (
    <Box sx={displayBoxProps}>
      {directionIconButton}
      {openCloseIconButton}
    </Box>
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
  const addChildIconButton = open && selected?.status !== 'editing' && (
    <IconButton {...addChildIconButtonProps}>
      <AddIcon fontSize="inherit" />
    </IconButton>
  );

  const addNextIconButtonProps: IconButtonProps = {
    size: 'small',
    sx: {
      position: 'absolute',
      top: parent?.direction === 'vertical' ? tree.height + m / 2 : card.height / 2,
      left: parent?.direction === 'vertical' ? card.width / 2 : tree.width + m / 2,
      transform: 'translate3d(-50%, -50%, 0)',
    },
    onClick() {
      if (!parent) throw new Error();
      dispatch(entitySlice.actions.addNext({ parentId: parent.id, targetId: id }));
    },
  };
  const addNextIconButton = parent && selected?.status !== 'editing' && (
    <IconButton {...addNextIconButtonProps}>
      <AddIcon fontSize="inherit" />
    </IconButton>
  );

  return (
    <Group {...rootGroupProps}>
      <Rect {...treeProps} fill="#00aaff08" />
      <Group {...cardGroupProps}>
        <Rect {...cardProps} fill="#2348" />
        {textElement}
      </Group>
      <Html>
        <ThemeProvider theme={cardActionTheme}>
          <Box sx={{ width: 0, height: 0, position: 'relative' }}>
            {textField}
            {saveButton}

            {editButtonBox}
            {displayBox}

            {addChildIconButton}
            {addNextIconButton}
          </Box>
        </ThemeProvider>
      </Html>
    </Group>
  );
};

export default FlowCard;
