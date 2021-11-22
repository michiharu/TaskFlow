import * as React from 'react';

import { SxProps } from '@mui/system';
import Konva from 'konva';
import { Group, Rect, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import { useDispatch } from 'react-redux';

import { Badge, Box, Button, IconButton, IconButtonProps, TextField, ThemeProvider } from '@mui/material';

import {
  ArrowDownward as ArrowDownwardIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

import { cardActionTheme, entitySettings } from '../const';
import { entitySlice } from '../store/flow-entity';
import { DropZone, FlowEntity, Point, SelectStatus } from '../types/flow-entity';

const { card } = entitySettings;
const space = 7;
const margin = 4;
const boxBgcolor = '#444a';
const easing = Konva.Easings.EaseOut;

type DraggingHistory = Point & { time: number };

type Props = {
  entity: FlowEntity;
  dropZones: DropZone[];
  selectedStatus?: SelectStatus;
};

const predictPointDiff = (h: DraggingHistory[]): Point | undefined => {
  if (h.length < 2) return undefined;
  const first = h[0];
  const last = h[h.length - 1];
  const duration = (first.time - last.time) / 400;
  return { x: (first.x - last.x) / duration, y: (first.y - last.y) / duration };
};

const FlowCard: React.FC<Props> = ({ entity, dropZones, selectedStatus }) => {
  const dispatch = useDispatch();
  const { id, parent, point, tree, open, direction, childIds, text } = entity;
  const rootGroupRef = React.useRef<Konva.Group>(null);
  const pointRef = React.useRef<Point>();
  const historyRef = React.useRef<DraggingHistory[]>([]);
  if (!pointRef.current && point) pointRef.current = point;

  const selected = selectedStatus?.id === id && selectedStatus.status === 'selected';
  const editing = selectedStatus?.id === id && selectedStatus.status === 'editing';
  const dragging = selectedStatus?.id === id && selectedStatus.status === 'dragging';
  const moving = selectedStatus?.id === id && selectedStatus.status === 'moving';

  React.useEffect(() => {
    if (!pointRef.current || !point || dragging) return;
    const changedPoint = pointRef.current.x !== point.x || pointRef.current.y !== point.y;
    if (changedPoint) {
      rootGroupRef.current?.to({ ...point, easing });
      pointRef.current = point;
    }
  }, [point]);

  React.useEffect(() => {
    let timer: number | undefined;
    const stamp = () => {
      if (rootGroupRef.current && pointRef.current) {
        const x = rootGroupRef.current.x() - pointRef.current.x;
        const y = rootGroupRef.current.y() - pointRef.current.y;
        const time = Date.now();
        historyRef.current = historyRef.current
          .concat({ x, y, time })
          .sort((a, b) => b.time - a.time)
          .slice(0, 12);
      }
    };
    if (dragging) {
      if (!timer) timer = window.setInterval(stamp, 60);
    } else {
      historyRef.current = [];
    }
    return () => window.clearInterval(timer);
  }, [dragging]);

  if (!point || !tree) return null;
  // if (!point || !tree || (id !== selected?.id && selected?.status === 'dragging')) return null;

  const rootGroupProps: React.ComponentProps<typeof Group> = {
    ...pointRef.current,
    ref: rootGroupRef,
    draggable: Boolean(parent),
    onMouseEnter() {
      if (!selectedStatus || (selectedStatus.status === 'selected' && selectedStatus?.id !== id)) {
        dispatch(entitySlice.actions.select(id));
        if (!open) document.body.style.cursor = 'grab';
      }
    },
    onMouseLeave() {
      document.body.style.cursor = 'default';
    },

    onMouseDown() {
      if (!open && Boolean(parent)) document.body.style.cursor = 'grabbing';
    },
    onMouseUp() {
      if (!open && Boolean(parent)) document.body.style.cursor = 'grab';
      if (!rootGroupRef.current) return;
      if (selectedStatus?.status !== 'dragging') return;
      const onFinish = () => dispatch(entitySlice.actions.finishMoving());
      rootGroupRef.current.to({ ...point, easing, onFinish });
      dispatch(entitySlice.actions.dragEnd());
    },

    onDragStart() {
      dispatch(entitySlice.actions.dragStart());
    },
    onDragMove(e) {
      if (selectedStatus?.status === 'moving') return;
      if (!parent || !pointRef.current) return;
      const d = predictPointDiff(historyRef.current);
      const x = e.currentTarget.x() + card.width / 2 + (d?.x ?? 0);
      const y = e.currentTarget.y() + card.height / 2 + (d?.y ?? 0);
      const zone = dropZones.find((p) => p.x < x && x < p.x + p.width && p.y < y && y < p.y + p.height);
      const index = parent.childIds.indexOf(id);
      if (zone && (zone.parent.id !== parent.id || (zone.parent.index !== index && zone.parent.index - 1 !== index))) {
        dispatch(entitySlice.actions.dragEnter(zone.parent));
      }
    },
    onDragEnd() {
      document.body.style.cursor = 'grab';
      if (!rootGroupRef.current) return;
      const onFinish = () => dispatch(entitySlice.actions.finishMoving());
      rootGroupRef.current.to({ ...point, easing, onFinish });
      dispatch(entitySlice.actions.dragEnd());
    },
  };
  const treeProps: React.ComponentProps<typeof Rect> = {
    ...tree,
    onMouseEnter() {
      if (selected) dispatch(entitySlice.actions.select(undefined));
    },
  };
  const treeRect = !moving && <Rect {...treeProps} fill="#00aaff08" />;

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
  const textElement = !editing && <Text {...textProps} fill="#fff" />;
  const textField = editing && (
    <TextField
      variant="standard"
      sx={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: card.width,
        height: card.height,
      }}
      InputProps={{ sx: { px: 0.87, py: 0.8, fontSize: 14 } }}
      autoFocus
      multiline
      rows={4}
      value={text}
      onChange={(e) => dispatch(entitySlice.actions.update({ id, changes: { text: e.target.value } }))}
      onKeyDown={(e) => {
        if (e.code === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) dispatch(entitySlice.actions.editEnd());
      }}
    />
  );

  const saveButton = editing && (
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

  const deleteBoxProps: SxProps = {
    position: 'absolute',
    left: margin,
    top: margin,
    p: 0.5,
    bgcolor: boxBgcolor,
    borderRadius: 1,
  };
  const deleteButtonProps: IconButtonProps = {
    size: 'small',
    onClick: () => {
      if (!parent) throw new Error();
      dispatch(entitySlice.actions.delete(parent));
    },
  };
  const deleteButtonBox = parent && selected && (
    <Box sx={deleteBoxProps}>
      <IconButton {...deleteButtonProps}>
        <CloseIcon fontSize="inherit" />
      </IconButton>
    </Box>
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
  const editButtonProps: IconButtonProps = {
    size: 'small',
    onClick: () => {
      dispatch(entitySlice.actions.editStart());
    },
  };
  const editButtonBox = selected && (
    <Box sx={editorBoxProps}>
      <IconButton {...editButtonProps}>
        <EditIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );

  const transition = 'all 300ms 0s ease';
  const directionTransform = direction === 'horizontal' ? 'rotate(-90deg)' : undefined;
  const directionButtonProps: IconButtonProps = {
    size: 'small',
    sx: { mr: 0.5 },
    onClick: () => {
      const next = direction !== 'vertical' ? 'vertical' : 'horizontal';
      dispatch(entitySlice.actions.update({ id, changes: { direction: next } }));
    },
  };
  const directionButton = selected && open && (
    <IconButton {...directionButtonProps}>
      <ArrowDownwardIcon fontSize="inherit" sx={{ transition, transform: directionTransform }} />
    </IconButton>
  );

  const openCloseButtonProps: IconButtonProps = {
    size: 'small',
    onClick: () => dispatch(entitySlice.actions.update({ id, changes: { open: !open } })),
  };
  const expandMore =
    childIds.length !== 0 ? (
      <Badge color="primary" variant="dot">
        <ExpandMoreIcon fontSize="inherit" />
      </Badge>
    ) : (
      <ExpandMoreIcon fontSize="inherit" />
    );
  const openCloseButton = (
    <IconButton {...openCloseButtonProps}>{open ? <ExpandLessIcon fontSize="inherit" /> : expandMore}</IconButton>
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
  const displayBox = (selected || (!editing && !dragging && !open && childIds.length !== 0)) && (
    <Box sx={displayBoxProps}>
      {directionButton}
      {openCloseButton}
    </Box>
  );

  return (
    <Group {...rootGroupProps}>
      {treeRect}
      <Rect {...cardProps} fill="#2348" />
      {textElement}
      <Html>
        <ThemeProvider theme={cardActionTheme}>
          <Box sx={{ width: 0, height: 0, position: 'relative' }}>
            {textField}
            {saveButton}

            {deleteButtonBox}
            {editButtonBox}
            {displayBox}
          </Box>
        </ThemeProvider>
      </Html>
    </Group>
  );
};

export default FlowCard;
