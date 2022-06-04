import * as React from 'react';

import { Rect, Text } from 'react-konva';

import type { DropZone, SelectStatus } from '../types/flow-entity';

type Props = {
  zone: DropZone;
  selectedStatus?: SelectStatus;
};

const DropZoneComponent: React.FC<Props> = ({ zone }) => {
  const { x, y, width, height, from, reserved } = zone;
  const fill = reserved ? '#ff02' : '#00ff5510';
  const props = { x, y, width, height };
  return (
    <>
      <Rect {...props} fill={fill} />
      <Text x={x + 5} y={y + 5} text={`${from.slice(0, 8)}`} fill="#fff" />
    </>
  );
};

export default DropZoneComponent;
