import * as React from 'react';

import { useDispatch } from 'react-redux';

import { IconButton } from '@mui/material';

import { Add as AddIcon } from '@mui/icons-material';

import { entitySlice } from '../store/flow-entity';
import { AddablePointOfEntity } from '../types';

type Props = {
  point: AddablePointOfEntity;
};

const AddFlowButton: React.FC<Props> = ({ point }) => {
  const dispatch = useDispatch();
  const { parent, top, left } = point;
  return (
    <IconButton
      size="small"
      sx={{ position: 'absolute', left, top, transform: 'translate3d(-50%, -50%, 0)' }}
      onClick={() => dispatch(entitySlice.actions.add(parent))}
    >
      <AddIcon fontSize="inherit" />
    </IconButton>
  );
};

export default AddFlowButton;
