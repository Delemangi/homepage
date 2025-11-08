import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const TerminalHint = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenHint = localStorage.getItem('terminalHintSeen');

    if (!hasSeenHint) {
      const showTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 2_000);

      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem('terminalHintSeen', 'true');
      }, 10_000);

      return () => {
        clearTimeout(showTimeout);
        clearTimeout(hideTimeout);
      };
    }

    return () => {};
  }, []);

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        '@keyframes fadeInOut': {
          '0%': {
            opacity: 0,
            transform: 'translateX(-50%) translateY(20px)',
          },
          '10%': {
            opacity: 1,
            transform: 'translateX(-50%) translateY(0)',
          },
          '90%': {
            opacity: 1,
            transform: 'translateX(-50%) translateY(0)',
          },
          '100%': {
            opacity: 0,
            transform: 'translateX(-50%) translateY(-20px)',
          },
        },
        animation: 'fadeInOut 8s ease-in-out',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        border: '1px solid #00ffd0',
        borderRadius: 1,
        bottom: 24,
        boxShadow: '0 0 20px rgba(0, 255, 208, 0.3)',
        left: '50%',
        padding: 1.5,
        position: 'fixed',
        transform: 'translateX(-50%)',
        zIndex: 9_999,
      }}
    >
      <Typography
        sx={{
          color: '#00ffd0',
          fontFamily: '"Fira Code", monospace',
          fontSize: 13,
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        💡 Press{' '}
        <Box
          component="kbd"
          sx={{
            backgroundColor: 'rgba(0, 255, 208, 0.1)',
            border: '1px solid #00ffd0',
            borderRadius: 0.5,
            padding: '2px 6px',
          }}
        >
          Ctrl
        </Box>{' '}
        +{' '}
        <Box
          component="kbd"
          sx={{
            backgroundColor: 'rgba(0, 255, 208, 0.1)',
            border: '1px solid #00ffd0',
            borderRadius: 0.5,
            padding: '2px 6px',
          }}
        >
          `
        </Box>{' '}
        for Terminal Mode
      </Typography>
    </Box>
  );
};

export default TerminalHint;
