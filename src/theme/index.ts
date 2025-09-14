import { createTheme, type PaletteMode } from '@mui/material';

export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: 'transparent',
              color: mode === 'dark' ? '#ff63e9' : '#f4b860',
              filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.25))',
            },
            color: mode === 'dark' ? '#6a82fb' : '#ee3f71',
            transition: 'color 0.2s, filter 0.2s',
          },
        },
      },
    },
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            background: {
              default: '#10151a',
              paper: '#181e24',
            },
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
          }
        : {
            background: {
              default: '#fdfcfd',
              paper: '#ffffff',
            },
            info: {
              main: '#f4b860',
            },
            primary: {
              light: '#f67598',
              main: '#ee3f71',
            },
            secondary: {
              main: '#ffc0cd',
            },
            text: {
              primary: '#1f1416',
              secondary: '#6b4c57',
            },
          }),
    },
    typography: {
      allVariants:
        mode === 'dark'
          ? {
              color: '#f1f6fa',
              letterSpacing: 1,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.18)',
            }
          : {
              color: '#1f1416',
              letterSpacing: 1,
              textShadow: '0 0 0 transparent',
            },
      fontFamily: 'Kode Mono, monospace',
    },
  });

const theme = createAppTheme('dark');
export default theme;
