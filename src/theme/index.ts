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
    MuiLink: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundImage: 'linear-gradient(90deg, #ff63e9, #ff63e9)',
            backgroundSize: '100% 2px',
            color: '#ff63e9',
          },
          backgroundImage: 'linear-gradient(90deg, #6a82fb, #6a82fb)',
          backgroundPosition: '0 100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '0% 2px',
          color: '#6a82fb',
          position: 'relative',
          textDecoration: 'none',
          textDecorationThickness: 2,
          textUnderlineOffset: 3,
          transition:
            'color 0.2s, background-size 0.3s cubic-bezier(.4,1,.4,1), background-image 0.2s',
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
