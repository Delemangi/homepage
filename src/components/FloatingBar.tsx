import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const FloatingBar = styled(Box)(({ theme }) => ({
  backdropFilter: 'blur(18px) saturate(135%)',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(23, 27, 37, 0.78)'
      : 'rgba(255, 255, 255, 0.84)',
  border: `1px solid ${
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(35, 25, 42, 0.10)'
  }`,
  borderRadius: 10,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 18px 50px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 -1px 0 rgba(0, 0, 0, 0.25)'
      : '0 18px 50px rgba(61, 28, 43, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
  display: 'flex',
  gap: 4,
  padding: 4,
  position: 'fixed',
  right: 'max(16px, env(safe-area-inset-right, 0px) + 8px)',
  top: 12,
  WebkitBackdropFilter: 'blur(18px) saturate(135%)',
  zIndex: 10,
}));

export default FloatingBar;
