import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    background: {
      default: '#10151a',
      paper: '#1a222b',
    },
    mode: 'dark',
    primary: {
      main: '#e0e0e0',
    },
    text: {
      primary: '#fff',
      secondary: '#b0b8c1',
    },
  },
  typography: {
    allVariants: {
      color: '#fff',
      letterSpacing: 1,
      textShadow: '0 1px 2px rgba(0,0,0,0.35)',
    },
    fontFamily: 'Kode Mono, monospace',
  },
});
