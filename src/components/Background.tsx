import { Box, styled } from '@mui/material';

const pattern = `url("data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='40' height='40' fill='none'/><path d='M0 40L40 0' stroke='rgba(255,255,255,0.04)' stroke-width='2'/><path d='M-10 30L30 -10' stroke='rgba(255,255,255,0.04)' stroke-width='2'/><path d='M10 50L50 10' stroke='rgba(255,255,255,0.04)' stroke-width='2'/></svg>")`;

const Background = styled(Box)({
  '@keyframes pulse': {
    '0%': {
      backgroundSize: '100% 100%, 40px 40px',
    },
    '100%': {
      backgroundSize: '130% 130%, 40px 40px',
    },
  },
  animation: 'pulse 7s ease-in-out infinite alternate',
  background: `
    radial-gradient(ellipse at 60% 40%, #232b36 25%, #1a222b 60%, #10151a 100%) center,
    ${pattern}
  `,
  backgroundBlendMode: 'overlay',
  height: '100%',
  left: 0,
  overflowX: 'hidden',
  overflowY: 'auto',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: -1,
});

export default Background;
