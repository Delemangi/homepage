import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'transparent',
            color: '#ff63e9',
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))',
          },
          color: '#6a82fb',
          transition: 'color 0.2s, filter 0.2s',
        },
      },
    },
  },
  palette: {
    background: {
      default: '#10151a',
      paper: '#181e24',
    },
    mode: 'dark',
    primary: {
      main: '#6a82fb',
    },
    secondary: {
      main: '#ff63e9',
    },
    text: {
      primary: '#f1f6fa',
      secondary: '#aeefff',
    },
  },
  typography: {
    allVariants: {
      color: '#f1f6fa',
      letterSpacing: 1,
      textShadow: '0 1px 2px rgba(0,0,0,0.18)',
    },
    fontFamily: 'Kode Mono, monospace',
  },
});

export default theme;
