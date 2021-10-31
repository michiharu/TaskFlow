import * as React from 'react';

import { SxProps } from '@mui/system';
import { Html } from 'react-konva-utils';
import { useDispatch } from 'react-redux';

import { ThemeProvider, Box, TextField } from '@mui/material';

import { cardActionBarHeight as barHeight, cardContentTheme, entitySettings as settings } from '../const';
import { entitySlice } from '../store/flow-entity';
import { FlowEntity } from '../types';

const { card } = settings;

type Props = {
  entity: FlowEntity;
};

const FlowCardContent: React.FC<Props> = ({ entity }) => {
  const dispatch = useDispatch();
  const { id, text } = entity;

  const handleChangeText: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    dispatch(entitySlice.actions.update({ id, changes: { text: e.target.value } }));
  };

  const containerProps: SxProps = {
    position: 'absolute',
    top: barHeight,
    left: 0,
    width: card.width,
    height: card.height - barHeight,
  };

  return (
    <Html>
      <ThemeProvider theme={cardContentTheme}>
        <Box sx={{ width: 0, height: 0, position: 'relative' }}>
          <Box sx={containerProps}>
            <TextField
              variant="standard"
              value={text}
              onChange={handleChangeText}
              InputProps={{ sx: { px: 0.5 } }}
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </Box>
      </ThemeProvider>
    </Html>
  );
};

export default FlowCardContent;
