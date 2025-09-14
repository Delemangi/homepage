import { type PaletteMode } from '@mui/material';
import { createContext, useContext } from 'react';

export type ThemeModeContextValue = {
  mode: PaletteMode;
  preference: 'system' | PaletteMode;
  setPreference: (p: 'system' | PaletteMode) => void;
  toggleMode: () => void;
};

export const ThemeModeContext = createContext<
  ThemeModeContextValue | undefined
>(undefined);

export const useThemeMode = () => {
  const ctx = useContext(ThemeModeContext);

  if (!ctx) {
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  }

  return ctx;
};
