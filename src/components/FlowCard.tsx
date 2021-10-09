import * as React from 'react';

import { Rect, Text } from 'react-konva';

import { FlowEntity } from '../types/tree-node';

type Props = {
  entity: FlowEntity;
};

const FlowCard: React.FC<Props> = ({ entity }) => {
  const { point, size } = entity;
  if (!point || !size) return null;

  return (
    <>
      <Rect {...point} {...size.body} fill="#aaa1" />
      <Rect {...point} {...size.tree} fill="#0a01" />
      <Text {...point} text={entity.text.primary} fontSize={12} fill="#ff0" />
    </>
  );
};

export default FlowCard;
