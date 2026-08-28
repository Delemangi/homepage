import { Box } from '@mui/material';
import { type ReactNode, useEffect, useState } from 'react';

import { useHashNavigation } from '../hooks/useHashNavigation';
import { useReducedMotion } from '../hooks/useReducedMotion';

type Props = Readonly<{
  children: ReactNode;
  delay?: number;
}>;

const StaggeredReveal = ({ children, delay = 0 }: Props) => {
  const isHashNavigation = useHashNavigation();
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(reduceMotion);
  const showContent = isHashNavigation || reduceMotion || isVisible;

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
        '&:has(:target)': {
          filter: 'blur(0)',
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
          transition: 'none',
        },
        filter: showContent ? 'blur(0)' : 'blur(6px)',
        opacity: showContent ? 1 : 0,
        scrollSnapAlign: 'start',
        transform: showContent
          ? 'translate3d(0, 0, 0)'
          : 'translate3d(0, 16px, 0)',
        transition:
          reduceMotion || isHashNavigation
            ? 'none'
            : 'opacity 560ms cubic-bezier(.16,1,.3,1), transform 560ms cubic-bezier(.16,1,.3,1), filter 620ms cubic-bezier(.16,1,.3,1)',
      }}
    >
      {children}
    </Box>
  );
};

export default StaggeredReveal;
