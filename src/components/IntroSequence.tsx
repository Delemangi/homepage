import { Box, Typography, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { SITE_TITLE } from '../constants';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTextScramble } from '../hooks/useScramble';

const HANDOFF_DELAY_MS = 720;
const EXIT_DELAY_MS = 1_400;
const COMPLETE_DELAY_MS = 1_750;
const REDUCED_MOTION_DELAY_MS = 180;

type IntroPhase = 'entering' | 'exiting' | 'handoff';

type Props = Readonly<{
  onComplete: () => void;
}>;

export const IntroSequence = ({ onComplete }: Props) => {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  const titleRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<null | number>(null);
  const [phase, setPhase] = useState<IntroPhase>('entering');
  const { start, text } = useTextScramble(SITE_TITLE, 640);
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    const skipIntro = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onComplete();
    };

    document.addEventListener('keydown', skipIntro);

    return () => {
      document.removeEventListener('keydown', skipIntro);
    };
  }, [onComplete]);

  useEffect(() => {
    if (reduceMotion) {
      setPhase('exiting');
      const reducedCompletionTimer = setTimeout(
        onComplete,
        REDUCED_MOTION_DELAY_MS,
      );

      return () => {
        clearTimeout(reducedCompletionTimer);
      };
    }

    start();

    const handoffTimer = setTimeout(() => {
      setPhase('handoff');
      animationFrameRef.current = requestAnimationFrame(() => {
        const title = titleRef.current;
        const target = document.querySelector('#site-title-target');

        if (title === null || target === null) return;

        const sourceRect = title.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const scale = targetRect.width / Math.max(sourceRect.width, 1);

        title.style.transformOrigin = 'top left';
        title.style.transform = `translate3d(${targetRect.left - sourceRect.left}px, ${targetRect.top - sourceRect.top}px, 0) scale(${scale})`;
      });
    }, HANDOFF_DELAY_MS);
    const exitTimer = setTimeout(() => {
      setPhase('exiting');
    }, EXIT_DELAY_MS);
    const completionTimer = setTimeout(onComplete, COMPLETE_DELAY_MS);

    return () => {
      clearTimeout(handoffTimer);
      clearTimeout(exitTimer);
      clearTimeout(completionTimer);

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [onComplete, reduceMotion, start]);

  return (
    <Box
      aria-hidden="true"
      data-motion="reduced-opacity"
      data-phase={phase}
      data-testid="intro-overlay"
      sx={{
        '&::after': {
          backgroundImage: isDark
            ? 'linear-gradient(rgba(139, 157, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 157, 255, 0.08) 1px, transparent 1px)'
            : 'linear-gradient(rgba(181, 25, 77, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(181, 25, 77, 0.07) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          content: "''",
          inset: 0,
          maskImage:
            'radial-gradient(circle at center, black 0%, transparent 72%)',
          opacity: phase === 'handoff' ? 0 : 1,
          position: 'absolute',
          transition: 'opacity 520ms cubic-bezier(.16,1,.3,1)',
        },
        alignItems: 'center',
        background: isDark
          ? 'radial-gradient(circle at 50% 42%, rgba(139, 157, 255, 0.17), transparent 30%), radial-gradient(circle at 62% 55%, rgba(255, 113, 216, 0.12), transparent 34%), #090b10'
          : 'radial-gradient(circle at 50% 42%, rgba(181, 25, 77, 0.12), transparent 32%), radial-gradient(circle at 62% 55%, rgba(192, 68, 114, 0.10), transparent 36%), #f7f5f8',
        display: 'flex',
        flexDirection: 'column',
        inset: 0,
        justifyContent: 'center',
        opacity: phase === 'exiting' ? 0 : 1,
        overflow: 'hidden',
        position: 'fixed',
        transition: reduceMotion
          ? 'opacity 180ms ease-out'
          : 'background-color 520ms cubic-bezier(.16,1,.3,1), opacity 350ms cubic-bezier(.16,1,.3,1)',
        zIndex: 1_400,
      }}
    >
      <Typography
        ref={titleRef}
        sx={{
          background: isDark
            ? 'linear-gradient(100deg, #f4f6ff 0%, #8b9dff 36%, #ff71d8 72%, #f4f6ff 100%)'
            : 'linear-gradient(100deg, #26141d 0%, #b5194d 42%, #7f3053 75%, #26141d 100%)',
          backgroundClip: 'text',
          backgroundSize: '240% 100%',
          color: 'transparent',
          fontFamily: 'Kode Mono, ui-monospace, monospace',
          fontSize: 'clamp(48px, 9vw, 104px)',
          fontWeight: 700,
          letterSpacing: '-0.085em',
          lineHeight: 1,
          paddingBottom: '0.08em',
          position: 'relative',
          textShadow: isDark
            ? '0 0 32px rgba(139, 157, 255, 0.22)'
            : '0 0 26px rgba(181, 25, 77, 0.12)',
          transition: reduceMotion
            ? 'none'
            : 'transform 650ms cubic-bezier(.4,1,.4,1)',
          zIndex: 1,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};
