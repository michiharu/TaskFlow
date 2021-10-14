import * as React from 'react';

import { useDispatch } from 'react-redux';

import { Box, Button, IconButton, Popover, TextField } from '@mui/material';

import { Add as AddIcon } from '@mui/icons-material';

import { flowSlice } from '../store/flow/slice';

const CreateFlowButton: React.FC = () => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [title, setTitle] = React.useState('');

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setTitle('');
    setAnchorEl(null);
  };

  const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement> = (event) => setTitle(event.target.value);

  const handleClickAdd = () => {
    dispatch(flowSlice.actions.create(title));
    setTitle('');
    setAnchorEl(null);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.code === 'Enter' && !event.nativeEvent.isComposing) {
      dispatch(flowSlice.actions.create(title));
      window.setTimeout(() => {
        setTitle('');
        setAnchorEl(null);
      }, 0);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton aria-describedby={id} sx={{ mx: 2 }} onClick={handleOpen}>
        <AddIcon fontSize="inherit" />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            id="create-flow-title"
            label="Flow Title"
            onChange={handleChangeTitle}
            onKeyDown={handleKeyDown}
            autoFocus
            fullWidth
          />
          <Button sx={{ mt: 2 }} variant="contained" startIcon={<AddIcon />} fullWidth onClick={handleClickAdd}>
            New Flow
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default CreateFlowButton;
