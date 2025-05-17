import { Box, styled } from '@mui/material';

const diagonalLines = `url("data:image/svg+xml;utf8,<svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'><line x1='0' y1='32' x2='32' y2='0' stroke='rgba(255,255,255,0.025)' stroke-width='2'/></svg>")`;

const Background = styled(Box)({
  background: `
    linear-gradient(120deg, #232b36 0%, #181e24 100%),
    linear-gradient(100deg, rgba(106,130,251,0.18) 10%, rgba(0,255,208,0.10) 80%),
    linear-gradient(210deg, rgba(255,99,233,0.13) 20%, rgba(0,0,0,0) 80%),
    ${diagonalLines}
  `,
  backgroundBlendMode: 'screen, lighten, lighten, overlay',
  backgroundPosition: 'center, center, center, 0 0',
  backgroundRepeat: 'no-repeat, no-repeat, no-repeat, repeat',
  backgroundSize: 'cover, cover, cover, 32px 32px',
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
