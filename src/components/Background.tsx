import { Box, styled, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const squares = `url("data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='0.35' y='0.35' width='39.3' height='39.3' stroke='rgba(255,255,255,0.018)' stroke-width='0.7' fill='none'/></svg>")`;

const StyledBackground = styled(Box)({
  background: `
    linear-gradient(120deg, #232b36 0%, #181e24 100%),
    linear-gradient(100deg, rgba(106,130,251,0.18) 10%, rgba(0,255,208,0.10) 80%),
    linear-gradient(210deg, rgba(255,99,233,0.13) 20%, rgba(0,0,0,0) 80%),
    ${squares}
  `,
  backgroundBlendMode: 'screen, lighten, lighten, overlay',
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
});

const Ripple = styled(Typography)({
  '@keyframes ripple': {
    from: {
      height: 0,
      opacity: 0.7,
      width: 0,
    },
    to: {
      height: '400px',
      opacity: 0,
      width: '400px',
    },
  },
  animation: 'ripple 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
  background:
    'radial-gradient(circle, rgba(0, 255, 208, 0.25) 0%, rgba(0, 255, 208, 0) 80%)',
  borderRadius: '50%',
  pointerEvents: 'none',
  position: 'fixed',
  transform: 'translate(-50%, -50%)',
  willChange: 'width, height, opacity',
  zIndex: 2,
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
