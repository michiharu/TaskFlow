import * as React from 'react';

import * as Konva from 'konva';
import { Stage } from 'react-konva';

import { Box } from '@mui/material';

import { Size } from '../types';

type Props = {
  stageSize: Size;
  children: React.ReactElement;
  refs?: (container: HTMLDivElement, stage: Konva.default.Stage) => void;
};

const FlexibleStage: React.FC<Props> = ({ stageSize, children, refs }) => {
  const [size, setSize] = React.useState<Size>({ width: 0, height: 0 });
  const containerRef = React.useRef<HTMLDivElement>();
  const stageRef = React.useRef<Konva.default.Stage | null>();

  const containerCallbackRef = React.useCallback((container: HTMLDivElement): void => {
    containerRef.current = container;
    if (stageRef.current && refs) refs(container, stageRef.current);

    const { width, height } = container.getBoundingClientRect();
    setSize({ width, height });
  }, []);

  const stageCallbackRef = React.useCallback((stage: Konva.default.Stage): void => {
    stageRef.current = stage;
    if (containerRef.current && refs) refs(containerRef.current, stage);
  }, []);

  React.useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setSize({ width, height });
      }
    };
    window.addEventListener('resize', measure);
    measure();

    const scroll = () => {
      if (containerRef.current && stageRef.current) {
        const dx = containerRef.current.scrollLeft;
        const dy = containerRef.current.scrollTop;
        stageRef.current.container().style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
        stageRef.current.x(-dx);
        stageRef.current.y(-dy);
      }
    };

    if (containerRef.current) containerRef.current.addEventListener('scroll', scroll);

    return () => window.removeEventListener('resize', measure);
  }, []);

  const scrollSize: Size = {
    width: Math.max(stageSize.width, size.width),
    height: Math.max(stageSize.height, size.height),
  };

  return (
    <Box ref={containerCallbackRef} sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <Box sx={{ ...scrollSize, overflow: 'hidden' }}>
        <Stage ref={stageCallbackRef} {...size}>
          {children}
        </Stage>
      </Box>
    </Box>
  );
};

export default FlexibleStage;
