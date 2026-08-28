import { Box, type BoxProps, styled } from '@mui/material';
import { type MouseEvent, useRef, useState } from 'react';

import { useReducedMotion } from '../hooks/useReducedMotion';
import Ripple from './Ripple';

const createSquares = (stroke: string) =>
  `url("data:image/svg+xml;utf8,<svg width='56' height='56' viewBox='0 0 56 56' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M56 0H0V56' stroke='${stroke}' stroke-width='0.7' fill='none'/></svg>")`;

const StyledBackground = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  const grid = createSquares(
    isDark ? 'rgba(139,157,255,0.05)' : 'rgba(91,52,70,0.04)',
  );
  const blurredAurora = isDark
    ? `
      radial-gradient(900px 620px at 10% 4%, rgba(139, 157, 255, 0.28), transparent 62%),
      radial-gradient(780px 560px at 82% 12%, rgba(255, 113, 216, 0.18), transparent 66%),
      radial-gradient(720px 520px at 42% 74%, rgba(83, 230, 195, 0.10), transparent 72%)
    `
    : `
      radial-gradient(900px 620px at 10% 4%, rgba(181, 25, 77, 0.15), transparent 62%),
      radial-gradient(780px 560px at 82% 12%, rgba(192, 68, 114, 0.12), transparent 66%),
      radial-gradient(720px 520px at 42% 74%, rgba(122, 87, 0, 0.07), transparent 72%)
    `;

  return {
    '&::after': {
      background: isDark
        ? 'linear-gradient(180deg, transparent 0%, rgba(9, 11, 16, 0.34) 55%, rgba(9, 11, 16, 0.82) 100%)'
        : 'linear-gradient(180deg, transparent 0%, rgba(247, 245, 248, 0.28) 55%, rgba(247, 245, 248, 0.78) 100%)',
      content: "''",
      inset: 0,
      pointerEvents: 'none',
      position: 'absolute',
      zIndex: 0,
    },
    '&::before': {
      background: blurredAurora,
      content: "''",
      filter: 'blur(54px)',
      inset: 0,
      opacity: isDark ? 0.78 : 0.64,
      pointerEvents: 'none',
      position: 'absolute',
      zIndex: 0,
    },
    '@media (prefers-reduced-motion: reduce)': {
      scrollBehavior: 'auto',
    },
    background: isDark
      ? `
    ${grid},
    linear-gradient(145deg, #090b10 0%, #0d1018 48%, #090b10 100%)
  `
      : `
    ${grid},
    linear-gradient(145deg, #f7f5f8 0%, #fffefe 52%, #f4f0f4 100%)
  `,
    backgroundPosition: '0 0, center',
    backgroundRepeat: 'repeat, no-repeat',
    backgroundSize: '56px 56px, cover',
    height: '100%',
    left: 0,
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'fixed',
    scrollBehavior: 'smooth',
    top: 0,
    width: '100%',
    zIndex: 0,
  };
});

type Props = Pick<BoxProps, 'children'>;

type RipplePosition = Readonly<{
  id: number;
  x: number;
  y: number;
}>;

const Background = ({ children }: Props) => {
  const reduceMotion = useReducedMotion();
  const [ripples, setRipples] = useState<readonly RipplePosition[]>([]);
  const rippleIdRef = useRef(0);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;

    const ripple = {
      id: rippleIdRef.current,
      x: event.clientX,
      y: event.clientY,
    };

    rippleIdRef.current += 1;
    setRipples((current) => [...current, ripple]);
  };

  const removeRipple = (id: number) => {
    setRipples((current) => current.filter((item) => item.id !== id));
  };

  return (
    <StyledBackground
      data-testid="ambient-background"
      onClick={handleClick}
    >
      {ripples.map((ripple) => (
        <Ripple
          aria-hidden="true"
          data-testid="ambient-ripple"
          key={ripple.id}
          onAnimationEnd={() => {
            removeRipple(ripple.id);
          }}
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
      {children}
    </StyledBackground>
  );
};

export default Background;
