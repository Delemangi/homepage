import { Link, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const TARGET = 'Delemangi';

const RANDOM_SET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const randomChar = () =>
  RANDOM_SET[Math.floor(Math.random() * RANDOM_SET.length)];

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

const Name = () => {
  const [display, setDisplay] = useState(TARGET);
  const [isScrambling, setIsScrambling] = useState(false);
  const rafRef = useRef<null | number>(null);

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  const scramble = () => {
    if (isScrambling) return;
    if (prefersReduced) {
      setDisplay(TARGET);
      return;
    }
    setIsScrambling(true);
    const start = performance.now();
    const duration = 700;
    const n = TARGET.length;
    const thresholds = Array.from({ length: n }, (_, i) =>
      Math.min(0.95, Math.max(0.15, i / n + (Math.random() - 0.5) * (0.6 / n))),
    ).sort((a, b) => a - b);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(t);
      let out = '';
      for (let i = 0; i < n; i++) {
        out += eased >= thresholds[i] ? TARGET[i] : randomChar();
      }
      setDisplay(out);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(TARGET);
        setIsScrambling(false);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const onTitleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    scramble();
  };

  return (
    <Typography fontSize={48}>
      <Link
        href="#"
        onClickCapture={onTitleClick}
        onMouseDownCapture={(e) => {
          e.stopPropagation();
        }}
        onTouchStartCapture={(e) => {
          e.stopPropagation();
        }}
        sx={(theme) => ({
          '&:hover': {
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.secondary.main
                : theme.palette.info.main,
            scale: 1.02,
          },
          animation: 'auroraSweep 3s ease-in-out infinite alternate',
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(90deg, #6a82fb 0%, #ff63e9 100%)'
              : 'linear-gradient(90deg, #ee3f71 0%, #ffc0cd 50%, #ee3f71 100%)',
          backgroundClip: 'text',
          backgroundPosition: '0% 50%',
          backgroundSize: '250% 100%',
          color: 'transparent',
          display: 'inline-block',
          textDecoration: 'none',
          transition: 'all 0.2s, color 0.3s ease-in-out',
        })}
      >
        {display}
      </Link>
    </Typography>
  );
};

export default Name;
