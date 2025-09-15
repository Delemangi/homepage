import { useContext } from 'react';

import { PreloaderContext } from '../context/PreloaderContext';

export const usePreloader = () => useContext(PreloaderContext);
