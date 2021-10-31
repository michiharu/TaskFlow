import { createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    mode: 'dark',
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
} as const;

export const theme = createTheme(themeOptions);

export const cardActionTheme = createTheme({
  ...themeOptions,
  typography: { fontSize: 10 },
});

export const cardContentTheme = createTheme({
  ...themeOptions,
  typography: { fontSize: 13 },
});
