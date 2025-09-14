import { Box, styled, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import Ripple from './Ripple';

const createSquares = (stroke: string) =>
  `url("data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='0.35' y='0.35' width='39.3' height='39.3' stroke='${stroke}' stroke-width='0.7' fill='none'/></svg>")`;

const StyledBackground = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  const grid = createSquares(
    isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)',
  );
  const blurredAurora = isDark
    ? `
      radial-gradient(1000px 600px at 10% 10%, rgba(106, 130, 251, 0.25), rgba(0, 0, 0, 0) 60%),
      radial-gradient(900px 500px at 85% 25%, rgba(255, 99, 233, 0.18), rgba(0, 0, 0, 0) 65%),
      radial-gradient(800px 500px at 30% 80%, rgba(0, 255, 208, 0.15), rgba(0, 0, 0, 0) 70%)
    `
    : `
      radial-gradient(1000px 600px at 12% 12%, rgba(238, 63, 113, 0.18), rgba(0, 0, 0, 0) 60%),
      radial-gradient(900px 500px at 80% 20%, rgba(255, 192, 205, 0.14), rgba(0, 0, 0, 0) 65%),
      radial-gradient(850px 520px at 35% 85%, rgba(244, 184, 96, 0.12), rgba(0, 0, 0, 0) 70%)
    `;
  return {
    '&::before': {
      background: blurredAurora,
      content: "''",
      filter: 'blur(44px)',
      inset: 0,
      opacity: isDark ? 0.45 : 0.5,
      pointerEvents: 'none',
      position: 'absolute',
      zIndex: 0,
    },
    background: isDark
      ? `
    linear-gradient(120deg, #232b36 0%, #181e24 100%),
  linear-gradient(100deg, rgba(106, 130, 251, 0.18) 10%, rgba(0, 255, 208, 0.10) 80%),
  linear-gradient(210deg, rgba(255, 99, 233, 0.13) 20%, rgba(0, 0, 0, 0) 80%),
    ${grid}
  `
      : `
    linear-gradient(120deg, #fdfcfd 0%, #ffffff 100%),
  linear-gradient(100deg, rgba(238, 63, 113, 0.10) 12%, rgba(255, 192, 205, 0.08) 88%),
  linear-gradient(210deg, rgba(255, 128, 171, 0.08) 25%, rgba(0, 0, 0, 0) 85%),
    ${grid}
  `,
    backgroundBlendMode: isDark
      ? 'screen, lighten, lighten, overlay'
      : 'soft-light, screen, screen, multiply',
    backgroundPosition: 'center, center, center, 0 0',
    backgroundRepeat: 'no-repeat, no-repeat, no-repeat, repeat',
    backgroundSize: 'cover, cover, cover, 40px 40px',
    height: '100%',
    left: 0,
    overflowX: 'hidden',
    overflowY: 'auto',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: -1,
  };
});

type Props = {
  readonly children: React.ReactNode;
};

type RippleType = {
  id: number;
  x: number;
  y: number;
};

const Background = ({ children }: Props) => {
  const theme = useTheme();
  const [ripples, setRipples] = useState<RippleType[]>([]);
  const rippleId = useRef(0);

  const handleClick = (e: React.MouseEvent) => {
    const newRipple = {
      id: rippleId.current++,
      x: e.clientX,
      y: e.clientY,
    };

    setRipples((prev) => [...prev, newRipple]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (ripples.length === 0) return;

      setRipples((prev) => prev.slice(1));
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, [ripples]);

  useEffect(() => {
    setRipples([]);
    rippleId.current = 0;
  }, [theme.palette.mode]);

  return (
    <StyledBackground onClick={handleClick}>
      {ripples.map((ripple) => (
        <Ripple
          key={ripple.id}
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
      {children}
    </StyledBackground>
  );
};

export default Background;
