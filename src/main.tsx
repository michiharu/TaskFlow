import * as React from 'react';
import { render } from 'react-dom';

import { ThemeProvider } from '@mui/material/styles';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import { CssBaseline } from '@mui/material';

import App from './App';
import { history, store } from './store/setup-store';
import { theme } from './theme';

const Providers: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
};

render(<Providers />, document.querySelector('#root'));
