import * as React from 'react';

import * as Konva from 'konva';
import { Group, Rect } from 'react-konva';

import { cardActionBarHeight, entitySettings } from '../const';
import { FlowEntity } from '../types';

import FlowCardActionBar from './FlowCardActionBar';
import FlowCardContent from './FlowCardContent';

type Props = {
  entity: FlowEntity;
};

const FlowCard: React.FC<Props> = ({ entity }) => {
  const { point, tree } = entity;
  const rootRef = React.useRef<Konva.default.Group>(null);
  const cardRef = React.useRef<Konva.default.Rect>(null);
  if (!point || !tree) return null;

  return (
    <Group ref={rootRef} {...point}>
      <Rect ref={cardRef} {...tree} fill="#00aaff08" />
      <Rect {...entitySettings.card} fill="#2348" />
      <Rect width={entitySettings.card.width} height={cardActionBarHeight} fill="#6666" />
      <FlowCardActionBar entity={entity} />
      <FlowCardContent entity={entity} />
    </Group>
  );
};

export default FlowCard;
