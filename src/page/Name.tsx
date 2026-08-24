import type { MouseEvent } from 'react';

import { Link, Typography } from '@mui/material';

import { AURORA_ANIMATION, SITE_TITLE } from '../constants';
import { useTextScramble } from '../hooks/useScramble';

const Name = () => {
  const { start, text } = useTextScramble(SITE_TITLE, 700);

  const onTitleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    start();
  };

  return (
    <Typography
      component="h1"
      sx={{ fontSize: 48, margin: 0 }}
    >
      <Link
        component="button"
        id="site-title-target"
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
          '@media (prefers-reduced-motion: reduce)': {
            '&:hover': { scale: 1 },
            animation: 'none',
            transition: 'none',
          },
          animation: AURORA_ANIMATION,
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(90deg, #6a82fb 0%, #ff63e9 100%)'
              : `linear-gradient(90deg, ${theme.palette.primary.main} 0%, #9b2450 50%, ${theme.palette.primary.main} 100%)`,
          backgroundClip: 'text',
          backgroundPosition: '0% 50%',
          backgroundSize: '250% 100%',
          border: 0,
          color: 'transparent',
          cursor: 'pointer',
          display: 'inline-block',
          font: 'inherit',
          padding: 0,
          textDecoration: 'none',
          transition: 'scale 0.2s, color 0.3s ease-in-out',
        })}
        type="button"
      >
        {text}
      </Link>
    </Typography>
  );
};

export default Name;
