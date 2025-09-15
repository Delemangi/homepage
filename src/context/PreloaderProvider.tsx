import { type PropsWithChildren, useMemo } from 'react';

import {
  PreloaderContext,
  type PreloaderContextValue,
} from './PreloaderContext';

export const PreloaderProvider = ({
  children,
  value,
}: PropsWithChildren<{ readonly value: boolean }>) => {
  const ctx = useMemo<PreloaderContextValue>(
    () => ({ preloaderDone: value }),
    [value],
  );

  return (
    <PreloaderContext.Provider value={ctx}>
      {children}
    </PreloaderContext.Provider>
  );
};
