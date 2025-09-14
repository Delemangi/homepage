import { Link, styled } from '@mui/material';

const UnderlinedLink = styled(Link)(({ theme }) => ({
  '&:hover': {
    backgroundImage: `linear-gradient(90deg, ${
      theme.palette.mode === 'light'
        ? theme.palette.info.main
        : theme.palette.secondary.main
    }, ${
      theme.palette.mode === 'light'
        ? theme.palette.info.main
        : theme.palette.secondary.main
    })`,
    backgroundSize: '100% 2px',
    color:
      theme.palette.mode === 'light'
        ? theme.palette.info.main
        : theme.palette.secondary.main,
  },
  backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`,
  backgroundPosition: '0 100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '0% 2px',
  color: theme.palette.primary.main,
  position: 'relative',
  textDecoration: 'none',
  textDecorationThickness: 2,
  textUnderlineOffset: 3,
  transition:
    'color 0.2s, background-size 0.3s cubic-bezier(.4, 1, .4, 1), background-image 0.2s',
}));

export default UnderlinedLink;
