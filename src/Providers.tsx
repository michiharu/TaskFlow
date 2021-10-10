import * as React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

import { CssBaseline } from '@mui/material';

import App from './App';
import { store } from './store/setup-store';
import { theme } from './theme';

const Providers: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;
