import { Box, Typography, useTheme } from '@mui/material';
import { useEffect, useRef } from 'react';

import { AURORA_ANIMATION, SITE_TITLE } from '../constants';
import { useTextScramble } from './useScramble';

type PreloaderProps = Readonly<{
  fading?: boolean;
}>;

const Preloader = ({ fading = false }: PreloaderProps) => {
  const theme = useTheme();
  const bg = theme.palette.mode === 'dark' ? '#0b0b12' : '#ffffff';
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const { start, text } = useTextScramble(SITE_TITLE, 700);

  useEffect(() => {
    let timeoutId: null | number = window.setTimeout(() => {
      const ghost = ghostRef.current;
      const target = document.querySelector('#site-title-target');
      if (ghost && target) {
        const ghostRect = ghost.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const dx = targetRect.left - ghostRect.left;
        const dy = targetRect.top - ghostRect.top;
        const sx = targetRect.width / Math.max(1, ghostRect.width);
        const sy = targetRect.height / Math.max(1, ghostRect.height);

        ghost.style.transition = 'transform 700ms cubic-bezier(.4, 1, .4, 1)';
        ghost.style.transform = 'none';
        requestAnimationFrame(() => {
          ghost.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
        });
      }

      start();
    }, 0);

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
  }, [start]);

  return (
    <Box
      sx={{
        '@keyframes hexFill': {
          from: { transform: 'scaleY(0)' },
          to: { transform: 'scaleY(1)' },
        },
        alignItems: 'center',
        background: fading
          ? 'transparent'
          : theme.palette.mode === 'dark'
            ? `radial-gradient(900px 600px at 30% 30%, rgba(106, 130, 251, 0.12), transparent 60%), radial-gradient(800px 600px at 70% 70%, rgba(238, 63, 113, 0.12), transparent 60%), ${bg}`
            : `radial-gradient(900px 600px at 30% 30%, rgba(106, 130, 251, 0.10), transparent 60%), radial-gradient(800px 600px at 70% 70%, rgba(238, 63, 113, 0.10), transparent 60%), ${bg}`,
        display: 'flex',
        inset: 0,
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        position: 'fixed',
        transition: 'opacity 300ms ease, background 400ms ease',
        zIndex: 9_999,
      }}
    >
      <Typography
        component="div"
        ref={ghostRef}
        role="img"
        sx={(t) => ({
          animation: fading ? 'none' : AURORA_ANIMATION,
          background:
            t.palette.mode === 'dark'
              ? 'linear-gradient(90deg, #6a82fb 0%, #ff63e9 100%)'
              : 'linear-gradient(90deg, #ee3f71 0%, #ffc0cd 50%, #ee3f71 100%)',
          backgroundClip: 'text',
          backgroundPosition: '0% 50%',
          backgroundSize: '250% 100%',
          color: 'transparent',
          display: 'inline-block',
          fontSize: 48,
          fontWeight: 700,
          lineHeight: 1,
          transition: 'transform 700ms cubic-bezier(.4, 1, .4, 1)',
          userSelect: 'none',
        })}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Preloader;
