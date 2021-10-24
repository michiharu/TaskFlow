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

export const cardTheme = createTheme({
  ...themeOptions,
  typography: { fontSize: 10 },
});
