import { Link, Typography } from '@mui/material';

import { AURORA_ANIMATION, SITE_TITLE } from '../constants';
import { useTextScramble } from '../hooks/useScramble';

const Name = () => {
  const { start, text } = useTextScramble(SITE_TITLE, 700);

  return (
    <Typography
      component="h1"
      sx={{
        fontFamily: 'Kode Mono, ui-monospace, monospace',
        fontSize: 'clamp(48px, 8vw, 88px)',
        fontWeight: 700,
        letterSpacing: '-0.085em',
        lineHeight: 1,
        margin: 0,
      }}
    >
      <Link
        component="button"
        id="site-title-target"
        onClickCapture={(event) => {
          event.preventDefault();
          event.stopPropagation();
          start();
        }}
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
              ? 'linear-gradient(100deg, #f4f6ff 0%, #8b9dff 38%, #ff71d8 72%, #f4f6ff 100%)'
              : 'linear-gradient(100deg, #26141d 0%, #b5194d 42%, #7f3053 76%, #26141d 100%)',
          backgroundClip: 'text',
          backgroundPosition: '0% 50%',
          backgroundSize: '250% 100%',
          border: 0,
          color: 'transparent',
          cursor: 'pointer',
          display: 'inline-block',
          font: 'inherit',
          letterSpacing: '-0.085em',
          lineHeight: 'inherit',
          padding: '0 0 0.08em',
          textDecoration: 'none',
          textShadow:
            theme.palette.mode === 'dark'
              ? '0 0 34px rgba(139, 157, 255, 0.20)'
              : '0 0 24px rgba(181, 25, 77, 0.10)',
          transition:
            'scale 180ms cubic-bezier(.2,.8,.2,1), color 180ms ease-out',
        })}
        type="button"
      >
        {text}
      </Link>
    </Typography>
  );
};

export default Name;
