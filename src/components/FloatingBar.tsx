import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const FloatingBar = styled(Box)(({ theme }) => ({
  backdropFilter: 'blur(6px)',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(24, 30, 36, 0.55)'
      : 'rgba(255, 255, 255, 0.6)',
  borderRadius: 12,
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.18)',
  display: 'flex',
  gap: 4,
  padding: '2px 4px',
  position: 'fixed',
  right: 'max(16px, env(safe-area-inset-right, 0px) + 8px)',
  [theme.breakpoints.down('sm')]: {
    top: 'max(12px, env(safe-area-inset-top, 0px) + 12px)',
  },
  top: 12,
  WebkitBackdropFilter: 'blur(6px)',
  zIndex: 10,
}));

export default FloatingBar;
