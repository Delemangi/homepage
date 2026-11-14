import { CssBaseline, type PaletteMode, ThemeProvider } from '@mui/material';
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { createAppTheme } from '../theme';
import { ThemeModeContext } from './ThemeModeContext';

const PREF_KEY = 'themePreference';
const THEME_DATASET_KEY = 'theme';
const THEME_PREFERENCE_DATASET_KEY = 'themePreference';

type Props = {
  readonly children: ReactNode;
};

type ThemePreference = 'system' | PaletteMode;

const isThemePreference = (value: null | string): value is ThemePreference =>
  value !== null && ['dark', 'light', 'system'].includes(value);

const getInitialPreference = (): ThemePreference => {
  try {
    const raw = localStorage.getItem(PREF_KEY);

    return isThemePreference(raw) ? raw : 'system';
  } catch {
    return 'system';
  }
};

const getSystemMode = (): PaletteMode =>
  typeof matchMedia === 'function' &&
  matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

export const ThemeModeProvider = ({ children }: Props) => {
  const [preference, setPreference] =
    useState<ThemePreference>(getInitialPreference);
  const [systemMode, setSystemMode] = useState<PaletteMode>(getSystemMode);
  const mode: PaletteMode = preference === 'system' ? systemMode : preference;

  const toggleMode = useCallback(() => {
    if (preference === 'system') {
      setPreference(mode === 'dark' ? 'light' : 'dark');

      return;
    }

    setPreference((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, [mode, preference]);

  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)');

    const handler = (): void => {
      setSystemMode(mq.matches ? 'dark' : 'light');
    };

    mq.addEventListener('change', handler);

    handler();

    return () => {
      mq.removeEventListener('change', handler);
    };
  }, []);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  useEffect(() => {
    try {
      localStorage.setItem(PREF_KEY, preference);
    } catch {
      // Storage can be unavailable; the in-memory preference still applies.
    }

    const root = document.documentElement;
    root.dataset[THEME_DATASET_KEY] = mode;
    root.dataset[THEME_PREFERENCE_DATASET_KEY] = preference;

    const background = theme.palette.background.default;
    root.style.colorScheme = mode;
    root.style.backgroundColor = background;

    for (const meta of document.querySelectorAll<HTMLMetaElement>(
      'meta[name="theme-color"]',
    )) {
      meta.content = background;
    }
  }, [mode, preference, theme]);

  const contextValue = useMemo(
    () => ({ mode, preference, setPreference, toggleMode }),
    [mode, preference, toggleMode],
  );

  return (
    <ThemeModeContext value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext>
  );
};
