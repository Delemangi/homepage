import { useMediaQuery } from '@mui/material';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export const useReducedMotion = () => useMediaQuery(REDUCED_MOTION_QUERY);
