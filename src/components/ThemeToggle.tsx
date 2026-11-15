import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { IconButton, Tooltip } from '@mui/material';
import { startTransition } from 'react';

import { useReducedMotion } from '../hooks/useReducedMotion';
import { useThemeMode } from '../hooks/useThemeMode';

export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();
  const reduceMotion = useReducedMotion();
  const isDark = mode === 'dark';

  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <Tooltip title={label}>
      <IconButton
        aria-label={label}
        onClick={(event) => {
          if (reduceMotion) {
            toggleMode();
            return;
          }

          const rect = event.currentTarget.getBoundingClientRect();
          const root = document.documentElement;
          root.style.setProperty(
            '--theme-origin-x',
            `${rect.left + rect.width / 2}px`,
          );
          root.style.setProperty(
            '--theme-origin-y',
            `${rect.top + rect.height / 2}px`,
          );

          startTransition(() => {
            toggleMode();
          });
        }}
        size="small"
      >
        {isDark ? (
          <LightModeOutlinedIcon
            aria-hidden
            fontSize="small"
          />
        ) : (
          <DarkModeOutlinedIcon
            aria-hidden
            fontSize="small"
          />
        )}
      </IconButton>
    </Tooltip>
  );
}
