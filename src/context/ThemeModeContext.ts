import { type PaletteMode } from '@mui/material';
import { createContext } from 'react';

export type ThemeModeContextValue = {
  mode: PaletteMode;
  preference: 'system' | PaletteMode;
  setPreference: (p: 'system' | PaletteMode) => void;
  toggleMode: () => void;
};

export const ThemeModeContext = createContext<
  ThemeModeContextValue | undefined
>(undefined);
