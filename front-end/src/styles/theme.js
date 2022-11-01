import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#eeb105',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#816004',
    },
  },
});

export default theme;
