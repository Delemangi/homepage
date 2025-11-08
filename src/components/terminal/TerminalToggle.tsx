import { IconButton, Tooltip } from '@mui/material';
import { useRouter } from '@tanstack/react-router';
import { useCallback } from 'react';

import TerminalIcon from '../../icons/TerminalIcon';

const TerminalToggle = () => {
  const router = useRouter();
  const isTerminalMode = router.state.location.pathname === '/terminal';

  const handleClick = useCallback(() => {
    void router.navigate({ to: isTerminalMode ? '/' : '/terminal' });
  }, [isTerminalMode, router]);

  return (
    <Tooltip
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: (t) =>
              t.palette.mode === 'dark'
                ? 'rgba(97, 97, 97, 0.92)'
                : 'rgba(97, 97, 97, 0.92)',
            borderRadius: 1,
            fontSize: 13,
          },
        },
      }}
      title={isTerminalMode ? 'Exit Terminal' : 'Terminal Mode'}
    >
      <IconButton
        onClick={handleClick}
        sx={{
          '&:hover': {
            backgroundColor: (t) =>
              t.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.04)',
          },
          color: isTerminalMode ? '#00ffd0' : 'inherit',
          transition: 'all 0.3s ease',
        }}
      >
        <TerminalIcon />
      </IconButton>
    </Tooltip>
  );
};

export default TerminalToggle;
