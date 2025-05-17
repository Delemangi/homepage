import { Box, styled } from '@mui/material';

const squares = `url("data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='0.35' y='0.35' width='39.3' height='39.3' stroke='rgba(255,255,255,0.018)' stroke-width='0.7' fill='none'/></svg>")`;

const Background = styled(Box)({
  background: `
    linear-gradient(120deg, #232b36 0%, #181e24 100%),
    linear-gradient(100deg, rgba(106,130,251,0.18) 10%, rgba(0,255,208,0.10) 80%),
    linear-gradient(210deg, rgba(255,99,233,0.13) 20%, rgba(0,0,0,0) 80%),
    ${squares}
  `,
  backgroundBlendMode: 'screen, lighten, lighten, overlay',
  backgroundPosition: 'center, center, center, 0 0',
  backgroundRepeat: 'no-repeat, no-repeat, no-repeat, repeat',
  backgroundSize: 'cover, cover, cover, 40px 40px',
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
