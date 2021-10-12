import * as React from 'react';

import * as Konva from 'konva';
import { Group, Rect } from 'react-konva';

import { cardActionBarHeight } from '../const';
import { FlowEntity, FlowEntitySettings } from '../types/flow-entity';

import FlowCardActionBar from './FlowCardActionBar';

type Props = {
  entity: FlowEntity;
  settings: FlowEntitySettings;
};

const FlowCard: React.FC<Props> = ({ entity, settings }) => {
  const { point, tree } = entity;
  const { card } = settings;
  const rootRef = React.useRef<Konva.default.Group>(null);
  const cardRef = React.useRef<Konva.default.Rect>(null);
  if (!point || !tree) return null;

  return (
    <Group ref={rootRef} {...point}>
      <Rect ref={cardRef} {...tree} fill="#00aaff08" />
      <Rect {...card} fill="#2348" />
      <Rect width={card.width} height={cardActionBarHeight} fill="#6666" />
      <FlowCardActionBar entity={entity} settings={settings} />
    </Group>
  );
};

export default FlowCard;
