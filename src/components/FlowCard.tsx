import * as React from 'react';

import { Group, Rect, Text } from 'react-konva';

import { entitySettings } from '../const';
import { FlowEntity } from '../types';

import FlowCardActionBar from './FlowCardActionBar';

const { card } = entitySettings;
const space = 8;

type Props = {
  entity: FlowEntity;
  selected: boolean;
};

const FlowCard: React.FC<Props> = ({ entity, selected }) => {
  // const dispatch = useDispatch();
  const { point, tree, text } = entity;
  if (!point || !tree) return null;
  const cardGroupProps: React.ComponentProps<typeof Group> = {
    // onMouseEnter() {
    //   dispatch(entitySlice.actions.select(id));
    // },
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
    <Group {...point}>
      <Rect {...tree} fill="#00aaff08" />
      <Group {...cardGroupProps}>
        <Rect {...cardProps} fill="#2348" />
        <Text {...textProps} fill="#fff" />
      </Group>

      {selected && <FlowCardActionBar entity={entity} />}
    </Group>
  );
};

export default FlowCard;
