import { createContext } from 'react';

export type PreloaderContextValue = Readonly<{
  preloaderDone: boolean;
}>;

export const PreloaderContext = createContext<PreloaderContextValue>({
  preloaderDone: false,
});
