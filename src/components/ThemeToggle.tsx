import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { IconButton, Tooltip } from '@mui/material';

import { useReducedMotion } from '../hooks/useReducedMotion';
import { useThemeMode } from '../hooks/useThemeMode';

type ViewTransitionDocument = Document & {
  readonly startViewTransition: (update: () => void) => {
    readonly finished: Promise<void>;
  };
};

const supportsViewTransition = (
  documentValue: Document,
): documentValue is ViewTransitionDocument =>
  'startViewTransition' in documentValue;

const ThemeToggle = () => {
  const { mode, toggleMode } = useThemeMode();
  const reduceMotion = useReducedMotion();
  const isDark = mode === 'dark';

  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <Tooltip title={label}>
      <IconButton
        aria-label={label}
        onClick={(event) => {
          if (reduceMotion || !supportsViewTransition(document)) {
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

          const transition = document.startViewTransition(toggleMode);
          const cleanup = () => {
            root.style.removeProperty('--theme-origin-x');
            root.style.removeProperty('--theme-origin-y');
          };
          const cleanupWhenFinished = async () => {
            try {
              await transition.finished;
            } catch (error) {
              if (!(error instanceof Error)) throw error;
            } finally {
              cleanup();
            }
          };
          void cleanupWhenFinished();
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
};

export default ThemeToggle;
