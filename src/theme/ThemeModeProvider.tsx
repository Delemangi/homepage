import { CssBaseline, type PaletteMode, ThemeProvider } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { createAppTheme } from './index';
import { ThemeModeContext } from './ThemeModeContext';

const PREF_KEY = 'themePreference';

type Props = {
  readonly children: React.ReactNode;
};

export const ThemeModeProvider = ({ children }: Props) => {
  const getSystemMode = (): PaletteMode =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  const getInitialPreference = (): 'system' | PaletteMode => {
    const raw =
      typeof window === 'undefined'
        ? null
        : window.localStorage.getItem(PREF_KEY);
    if (raw === 'system' || raw === 'light' || raw === 'dark') return raw;
    return 'system';
  };

  const [preference, setPreference] = useState<'system' | PaletteMode>(
    getInitialPreference,
  );
  const [systemMode, setSystemMode] = useState<PaletteMode>(getSystemMode);
  const mode: PaletteMode = preference === 'system' ? systemMode : preference;

  useEffect(() => {
    try {
      window.localStorage.setItem(PREF_KEY, preference);
    } catch {
      // do nothing
    }
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = mode;
      document.documentElement.dataset.themePreference = preference;
    }
  }, [mode, preference]);

  const toggleMode = useCallback(() => {
    if (preference === 'system') {
      setPreference(mode === 'dark' ? 'light' : 'dark');
      return;
    }
    setPreference((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, [mode, preference]);

  useEffect(() => {
    let cleanup = () => {};
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (): void => {
        setSystemMode(mq.matches ? 'dark' : 'light');
      };
      mq.addEventListener('change', handler);
      handler();
      cleanup = () => {
        mq.removeEventListener('change', handler);
      };
    }
    return cleanup;
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

export default ThemeModeProvider;
