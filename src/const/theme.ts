import { createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    mode: 'dark',
  },
} as const;

export const theme = createTheme(themeOptions);

export const cardTheme = createTheme({
  ...themeOptions,
  typography: { fontSize: 10 },
});
