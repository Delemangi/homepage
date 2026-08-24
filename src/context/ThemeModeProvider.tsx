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
  const raw = localStorage.getItem(PREF_KEY);

  if (isThemePreference(raw)) {
    return raw;
  }

  return 'system';
};

const getSystemMode = (): PaletteMode =>
  matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const ThemeModeProvider = ({ children }: Props) => {
  const [preference, setPreference] =
    useState<ThemePreference>(getInitialPreference);
  const [systemMode, setSystemMode] = useState<PaletteMode>(getSystemMode);
  const mode: PaletteMode = preference === 'system' ? systemMode : preference;

  useEffect(() => {
    localStorage.setItem(PREF_KEY, preference);

    const { dataset } = document.documentElement;
    dataset[THEME_DATASET_KEY] = mode;
    dataset[THEME_PREFERENCE_DATASET_KEY] = preference;
  }, [mode, preference]);

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
