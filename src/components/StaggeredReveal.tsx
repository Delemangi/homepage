import { Box } from '@mui/material';
import { type ReactNode, useContext, useEffect, useState } from 'react';

import { PreloaderContext } from '../context/PreloaderContext';

type Props = Readonly<{
  children: ReactNode;
  delay?: number;
}>;

const StaggeredReveal = ({ children, delay = 0 }: Props) => {
  const { preloaderDone } = useContext(PreloaderContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeout: number | undefined;

    if (preloaderDone) {
      timeout = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    }

    return () => {
      if (timeout !== undefined) {
        clearTimeout(timeout);
      }
    };
  }, [delay, preloaderDone]);

  return (
    <Box
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition:
          'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </Box>
  );
};

export default StaggeredReveal;
