import { IconButton, Tooltip } from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';

import { usePreloader } from '../hooks/usePreloader';
import { useThemeMode } from '../hooks/useThemeMode';

const togglePop = keyframes({
  '0%': {
    transform: 'scale(0.9) rotate(0deg)',
  },
  '60%': {
    transform: 'scale(1.15) rotate(12deg)',
  },
  '100%': {
    transform: 'scale(1) rotate(0deg)',
  },
});

const AnimatedButton = styled(IconButton)({
  animationDuration: '260ms',
  animationFillMode: 'forwards',
  animationIterationCount: 1,
  animationName: togglePop,
  animationTimingFunction: 'cubic-bezier(.4, 1, .4, 1)',
});

const Emoji = styled('span')({
  fontSize: 20,
  lineHeight: 1,
});

const ThemeToggle = () => {
  const { preloaderDone } = usePreloader();
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === 'dark';

  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <Tooltip title={label}>
      <AnimatedButton
        key={mode}
        onClick={toggleMode}
        size="small"
        sx={{ animationPlayState: preloaderDone ? 'running' : 'paused' }}
      >
        <Emoji
          role="img"
          title={label}
        >
          {isDark ? '🌞' : '🌙'}
        </Emoji>
      </AnimatedButton>
    </Tooltip>
  );
};

export default ThemeToggle;
