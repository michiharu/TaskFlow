import * as React from 'react';
import { render } from 'react-dom';

import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import App from './App';
import { store } from './store/setup-store';
import { theme } from './theme';

const Providers: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

render(<Providers />, document.querySelector('#root'));
