import { useSyncExternalStore } from 'react';

const getHash = () => location.hash;
const getServerHash = () => '';

const subscribe = (onStoreChange: () => void) => {
  addEventListener('hashchange', onStoreChange);

  return () => {
    removeEventListener('hashchange', onStoreChange);
  };
};

export const useHashNavigation = () =>
  useSyncExternalStore(subscribe, getHash, getServerHash).length > 1;
