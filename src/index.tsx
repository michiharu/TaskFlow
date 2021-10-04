import { render } from 'react-dom';

import { ThemeProvider } from '@mui/material/styles';

import { CssBaseline } from '@mui/material';

import App from './App';
import theme from './theme';

render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector('#root')
);
