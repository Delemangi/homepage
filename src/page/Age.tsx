import { Box, Typography, type TypographyProps } from '@mui/material';
import { useEffect, useState } from 'react';

import { BIRTH_INSTANT } from '../constants';

const getAge = (decimals = 9) => {
  const diff = Date.now() - BIRTH_INSTANT;
  const age = diff / (1_000 * 60 * 60 * 24 * 365.25);

  return age.toFixed(decimals);
};

type Props = Omit<TypographyProps, 'fontSize' | 'marginBottom'> & {
  readonly fontSize?: number;
  readonly marginBottom?: number;
};

const Age = ({ fontSize, marginBottom, ...props }: Props) => {
  const [age, setAge] = useState(() => getAge());
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAge());
    }, 1_000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [integer, decimal] = age.split('.');
  const decimalDisplayPart = decimal ? `.${decimal}` : '';

  return (
    <Typography
      {...props}
      sx={{
        ...(fontSize !== undefined && { fontSize }),
        ...(marginBottom !== undefined && { marginBottom }),
      }}
    >
      <Box
        aria-expanded={expanded}
        component="button"
        onClick={() => {
          setExpanded((current) => !current);
        }}
        sx={{
          '&::after': {
            backgroundImage:
              'linear-gradient(to right, currentColor 2px, transparent 2px)',
            backgroundRepeat: 'repeat-x',
            backgroundSize: '4px 1px',
            bottom: 0,
            content: '""',
            height: '1px',
            left: 0,
            pointerEvents: 'none',
            position: 'absolute',
            right: 0,
            transform: 'translateY(0.2em)',
          },
          '&:focus-visible': {
            borderRadius: 0.5,
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 3,
          },
          appearance: 'none',
          background: 'none',
          border: 0,
          color: 'inherit',
          cursor: 'pointer',
          font: 'inherit',
          padding: 0,
          position: 'relative',
        }}
        type="button"
      >
        {integer}
        <Box
          component="span"
          sx={{
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
            },
            display: 'inline-block',
            maxWidth: expanded ? '10em' : '0px',
            overflow: 'hidden',
            transition: (theme) =>
              theme.transitions.create('max-width', {
                duration: theme.transitions.duration.short,
                easing: theme.transitions.easing.easeInOut,
              }),
            verticalAlign: 'middle',
            whiteSpace: 'nowrap',
          }}
        >
          {decimalDisplayPart}
        </Box>
        {' years old'}
      </Box>
    </Typography>
  );
};

export default Age;
