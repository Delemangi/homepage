import { Link, Typography } from '@mui/material';
import React from 'react';

import { useTextScramble } from '../components/useScramble';
import { AURORA_ANIMATION, SITE_TITLE } from '../constants';

const Name = () => {
  const { start, text } = useTextScramble(SITE_TITLE, 700);

  const onTitleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    start();
  };

  return (
    <Typography fontSize={48}>
      <Link
        href="#"
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
          animation: AURORA_ANIMATION,
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
        {text}
      </Link>
    </Typography>
  );
};

export default Name;
