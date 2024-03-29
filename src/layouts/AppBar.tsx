import * as React from 'react';

import { alpha, styled } from '@mui/material/styles';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';

import { Box, Button, Divider, InputBase, AppBar as MuiAppBar, Toolbar } from '@mui/material';

import { Search as SearchIcon } from '@mui/icons-material';

import { flowPage, topPage } from '../const';
import { FlowAppBar } from '../pages/flow';
import { TopAppBar } from '../pages/top';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const AppBar: React.FC = () => (
  // Referenced page
  // https://mui.com/components/app-bar/#app-bar-with-a-primary-search-field
  <MuiAppBar position="static">
    <Toolbar>
      <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Button component={Link} to={topPage.path} size="large">
          Task Flow
        </Button>
        <Divider orientation="vertical" flexItem variant="middle" sx={{ mx: 1 }} />
      </Box>

      <Switch>
        <Route path={topPage.path} exact>
          <TopAppBar />
        </Route>
        <Route path={flowPage.path}>
          <FlowAppBar />
        </Route>
      </Switch>

      <Box sx={{ flexGrow: 1, pl: 1 }} />

      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
      </Search>
    </Toolbar>
  </MuiAppBar>
);
export default AppBar;
