import { CssBaseline, type PaletteMode, ThemeProvider } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { createAppTheme } from '../theme';
import { ThemeModeContext } from './ThemeModeContext';

const PREF_KEY = 'themePreference';

type Props = {
  readonly children: React.ReactNode;
};

const getInitialPreference = (): 'system' | PaletteMode => {
  const raw = localStorage.getItem(PREF_KEY);

  if (raw === 'system' || raw === 'light' || raw === 'dark') {
    return raw;
  }

  return 'system';
};

const getSystemMode = (): PaletteMode =>
  matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const ThemeModeProvider = ({ children }: Props) => {
  const [preference, setPreference] = useState<'system' | PaletteMode>(
    getInitialPreference,
  );
  const [systemMode, setSystemMode] = useState<PaletteMode>(getSystemMode);
  const mode: PaletteMode = preference === 'system' ? systemMode : preference;

  useEffect(() => {
    localStorage.setItem(PREF_KEY, preference);

    document.documentElement.dataset.theme = mode;
    document.documentElement.dataset.themePreference = preference;
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
    <ThemeModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
