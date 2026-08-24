import { Box } from '@mui/material';
import { type ReactNode, useEffect, useState } from 'react';

import { useReducedMotion } from '../hooks/useReducedMotion';

type Props = Readonly<{
  children: ReactNode;
  delay?: number;
}>;

const StaggeredReveal = ({ children, delay = 0 }: Props) => {
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(reduceMotion);

  useEffect(() => {
    let timeout: number | undefined;

    if (reduceMotion) {
      setIsVisible(true);
    } else {
      timeout = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    }

    return () => {
      if (timeout !== undefined) {
        clearTimeout(timeout);
      }
    };
  }, [delay, reduceMotion]);

  return (
    <Box
      sx={{
        opacity: 1,
        scrollSnapAlign: 'start',
        transform:
          reduceMotion || isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: reduceMotion
          ? 'none'
          : 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </Box>
  );
};

export default StaggeredReveal;
