import * as React from 'react';

import { Rect, Text } from 'react-konva';

import type { DropZone, SelectedStatus } from '../types/flow-entity';

type Props = {
  zone: DropZone;
  selectedStatus?: SelectedStatus;
};

const DropZoneComponent: React.FC<Props> = ({ zone, selectedStatus }) => {
  const { x, y, width, height, parent, from, depth } = zone;
  const isBefore = parent.childIds[parent.index] === selectedStatus?.id;
  const isNext = parent.childIds.length !== 0 && parent.childIds[parent.index - 1] === selectedStatus?.id;
  const fill = isBefore || isNext ? '#ff02' : '#00ff5510';
  const props = { x, y, width, height };
  return (
    <>
      <Rect {...props} fill={fill} />
      <Text x={x + 5} y={y + 5} text={`${from.slice(0, 8)} ${depth}`} fill="#fff" />
    </>
  );
};

export default DropZoneComponent;
