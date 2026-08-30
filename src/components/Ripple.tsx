import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Ripple = styled(Typography)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';

  const lightColor = 'rgba(181, 25, 77, 0.22)';
  const lightMid = 'rgba(192, 68, 114, 0.10)';
  const lightStop = 'rgba(192, 68, 114, 0)';
  const darkColor = 'rgba(83, 230, 195, 0.18)';
  const darkStop = 'rgba(83, 230, 195, 0)';

  return {
    '@keyframes rippleDark': {
      from: {
        opacity: 0.7,
        transform: 'translate(-50%, -50%) scale(0)',
      },
      to: {
        opacity: 0,
        transform: 'translate(-50%, -50%) scale(1)',
      },
    },
    '@keyframes rippleLight': {
      from: {
        opacity: 0.95,
        transform: 'translate(-50%, -50%) scale(0)',
      },
      to: {
        opacity: 0,
        transform: 'translate(-50%, -50%) scale(1)',
      },
    },
    animation: `${isDark ? 'rippleDark' : 'rippleLight'} 0.9s cubic-bezier(.4, 0, .2, 1) forwards`,
    background: `radial-gradient(circle, ${
      isDark ? darkColor : lightColor
    } 0%, ${isDark ? 'rgba(83, 230, 195, 0.12)' : lightMid} 40%, ${
      isDark ? darkStop : lightStop
    } 85%)`,
    borderRadius: '50%',
    height: 180,
    mixBlendMode: isDark ? 'normal' : 'multiply',
    pointerEvents: 'none',
    position: 'fixed',
    transform: 'translate(-50%, -50%)',
    width: 180,
    willChange: 'transform, opacity',
    zIndex: 2,
  };
});

export default Ripple;
