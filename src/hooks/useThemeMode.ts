import { useContext } from 'react';

import { ThemeModeContext } from '../context/ThemeModeContext';

export const useThemeMode = () => {
  const ctx = useContext(ThemeModeContext);

  if (!ctx) {
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  }

  return ctx;
};
