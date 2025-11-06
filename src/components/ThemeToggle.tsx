import { IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useThemeMode } from '../hooks/useThemeMode';

const Emoji = styled('span')({
  fontSize: 20,
  lineHeight: 1,
});

const ThemeToggle = () => {
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === 'dark';

  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={toggleMode}
        size="small"
      >
        <Emoji
          role="img"
          title={label}
        >
          {isDark ? '🌞' : '🌙'}
        </Emoji>
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
