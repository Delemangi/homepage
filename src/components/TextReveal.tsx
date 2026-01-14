import { Box } from '@mui/material';
import { type ReactNode, useEffect, useRef, useState } from 'react';

type Props = Readonly<{
  children: ReactNode;
  delay?: number;
  direction?: 'down' | 'left' | 'right' | 'up';
}>;

const TextReveal = ({ children, delay = 0, direction = 'up' }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return () => {};
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(element);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.2,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

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
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition:
          'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </Box>
  );
};

export default TextReveal;
