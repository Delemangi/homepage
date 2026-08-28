import { Box } from '@mui/material';
import { type ReactNode, useEffect, useRef, useState } from 'react';

import { useHashNavigation } from '../hooks/useHashNavigation';
import { useReducedMotion } from '../hooks/useReducedMotion';

type Props = Readonly<{
  children: ReactNode;
  delay?: number;
  direction?: 'down' | 'left' | 'right' | 'up';
}>;

const offsetByDirection = {
  down: 'translate3d(0, -16px, 0)',
  left: 'translate3d(16px, 0, 0)',
  right: 'translate3d(-16px, 0, 0)',
  up: 'translate3d(0, 16px, 0)',
} as const;

const TextReveal = ({ children, delay = 0, direction = 'up' }: Props) => {
  const isHashNavigation = useHashNavigation();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(reduceMotion);
  const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);
  const showContent = isHashNavigation || reduceMotion || isVisible;

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

  return (
    <Box
      ref={ref}
      sx={{
        '&:has(:target)': {
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
          transition: 'none',
        },
        opacity: showContent ? 1 : 0,
        transform: showContent
          ? 'translate3d(0, 0, 0)'
          : offsetByDirection[direction],
        transition:
          reduceMotion || isHashNavigation
            ? 'none'
            : 'opacity 560ms cubic-bezier(.16,1,.3,1), transform 560ms cubic-bezier(.16,1,.3,1)',
      }}
    >
      {children}
    </Box>
  );
};

export default TextReveal;
