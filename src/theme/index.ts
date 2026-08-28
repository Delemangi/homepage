import { createTheme, type PaletteMode } from '@mui/material';

export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:active': {
              transform: 'translateY(0) scale(0.96)',
            },
            '&:hover': {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(139, 157, 255, 0.10)'
                  : 'rgba(181, 25, 77, 0.08)',
              color: mode === 'dark' ? '#f4f6ff' : '#371924',
              transform: 'translateY(-1px)',
            },
            '@media (max-width: 599.95px)': {
              minHeight: 44,
              minWidth: 44,
            },
            '@media (prefers-reduced-motion: reduce)': {
              '&:active, &:hover': {
                transform: 'none',
              },
              transition: 'none',
            },
            borderRadius: 8,
            color: mode === 'dark' ? '#8b9dff' : '#b5194d',
            transition:
              'color 180ms ease-out, background-color 180ms ease-out, transform 180ms cubic-bezier(.2,.8,.2,1)',
          },
        },
      },
    },
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            background: {
              default: '#090b10',
              paper: '#11141c',
            },
            info: {
              main: '#53e6c3',
            },
            primary: {
              main: '#8b9dff',
            },
            secondary: {
              main: '#ff71d8',
            },
            text: {
              primary: '#f4f6ff',
              secondary: '#a7afc0',
            },
          }
        : {
            background: {
              default: '#f7f5f8',
              paper: '#ffffff',
            },
            info: {
              main: '#7a5700',
            },
            primary: {
              light: '#d65b82',
              main: '#b5194d',
            },
            secondary: {
              main: '#c04472',
            },
            text: {
              primary: '#26141d',
              secondary: '#66545d',
            },
          }),
    },
    typography: {
      allVariants:
        mode === 'dark'
          ? {
              color: '#f4f6ff',
              letterSpacing: 0,
            }
          : {
              color: '#26141d',
              letterSpacing: 0,
            },
      fontFamily: 'Sora, system-ui, sans-serif',
    },
  });
