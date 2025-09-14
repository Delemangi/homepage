import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Ripple = styled(Typography)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';

  const lightColor = 'rgba(244, 184, 96, 0.50)';
  const lightMid = 'rgba(244, 184, 96, 0.18)';
  const lightStop = 'rgba(244, 184, 96, 0)';
  const darkColor = 'rgba(0, 255, 208, 0.25)';
  const darkStop = 'rgba(0, 255, 208, 0)';

  return {
    '@keyframes rippleDark': {
      from: {
        height: 0,
        opacity: 0.7,
        width: 0,
      },
      to: {
        height: '150px',
        opacity: 0,
        width: '150px',
      },
    },
    '@keyframes rippleLight': {
      from: {
        height: 0,
        opacity: 0.95,
        width: 0,
      },
      to: {
        height: '150px',
        opacity: 0,
        width: '150px',
      },
    },
    animation: `${isDark ? 'rippleDark' : 'rippleLight'} 0.9s cubic-bezier(.4, 0, .2, 1) forwards`,
    background: `radial-gradient(circle, ${
      isDark ? darkColor : lightColor
    } 0%, ${isDark ? 'rgba(0, 255, 208, 0.12)' : lightMid} 40%, ${
      isDark ? darkStop : lightStop
    } 85%)`,
    borderRadius: '50%',
    mixBlendMode: isDark ? 'normal' : 'multiply',
    pointerEvents: 'none',
    position: 'fixed',
    transform: 'translate(-50%, -50%)',
    willChange: 'width, height, opacity',
    zIndex: 2,
  };
});

export default Ripple;
