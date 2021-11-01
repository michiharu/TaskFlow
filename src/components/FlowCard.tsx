import * as React from 'react';

import { Group, Rect, Text } from 'react-konva';
import { useDispatch } from 'react-redux';

import { entitySettings } from '../const';
import { entitySlice } from '../store/flow-entity';
import { FlowEntity } from '../types';

import FlowCardActions from './FlowCardActions';

const { card } = entitySettings;
const space = 8;

type Props = {
  entity: FlowEntity;
  selected: boolean;
};

const FlowCard: React.FC<Props> = ({ entity, selected }) => {
  const dispatch = useDispatch();
  const { id, point, tree, text } = entity;
  if (!point || !tree) return null;
  const rootGroupProps: React.ComponentProps<typeof Group> = { ...point };
  const treeProps: React.ComponentProps<typeof Rect> = {
    ...tree,
    onMouseEnter() {
      dispatch(entitySlice.actions.select(undefined));
    },
  };
  const cardGroupProps: React.ComponentProps<typeof Group> = {
    onMouseEnter() {
      dispatch(entitySlice.actions.select(id));
    },
  };
  const cardProps: React.ComponentProps<typeof Rect> = { ...card };
  const textProps: React.ComponentProps<typeof Text> = {
    text,
    fontSize: 14,
    lineHeight: 1.5,
    x: space,
    y: space,
    width: card.width - space * 2,
    height: card.height - space * 2,
  };
  return (
    <Group {...rootGroupProps}>
      <Rect {...treeProps} fill="#00aaff08" />
      <Group {...cardGroupProps}>
        <Rect {...cardProps} fill="#2348" />
        <Text {...textProps} fill="#fff" />
      </Group>
      <FlowCardActions entity={entity} selected={selected} />
    </Group>
  );
};

export default FlowCard;
