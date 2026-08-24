import { Box } from '@mui/material';
import { type ReactNode, useEffect, useRef, useState } from 'react';

import { useReducedMotion } from '../hooks/useReducedMotion';

type Props = Readonly<{
  children: ReactNode;
  delay?: number;
  direction?: 'down' | 'left' | 'right' | 'up';
}>;

const TextReveal = ({ children, delay = 0, direction = 'up' }: Props) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(reduceMotion);
  const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (reduceMotion) {
      setIsVisible(true);
      return () => {};
    }

    const element = ref.current;

    if (!element) {
      return () => {};
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(element);
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.05,
      },
    );

    observer.observe(element);

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      observer.disconnect();
    };
  }, [delay, reduceMotion]);

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0)';

    switch (direction) {
      case 'down':
        return 'translate(0, -30px)';

      case 'left':
        return 'translate(30px, 0)';

      case 'right':
        return 'translate(-30px, 0)';

      case 'up':
        return 'translate(0, 30px)';

      default:
        return 'translate(0, 30px)';
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        opacity: reduceMotion || isVisible ? 1 : 0,
        transform: reduceMotion ? 'none' : getTransform(),
        transition: reduceMotion
          ? 'none'
          : 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </Box>
  );
};

export default TextReveal;
