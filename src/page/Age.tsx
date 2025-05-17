import { Box, Typography, type TypographyProps } from '@mui/material';
import { useEffect, useState } from 'react';

import { BIRTHDAY } from '../constants';

const getAge = (decimals = 9) => {
  const birthDate = new Date(BIRTHDAY);
  const currentDate = new Date();
  const diff = currentDate.getTime() - birthDate.getTime();
  const age = diff / (1_000 * 60 * 60 * 24 * 365.25);

  return age.toFixed(decimals);
};

type Props = TypographyProps;

const Age = (props: Props) => {
  const [age, setAge] = useState(() => getAge());
  const [hovering, setHovering] = useState(false);

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
      fontSize={16}
      {...props}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      sx={{
        cursor: 'default',
      }}
    >
      <Box
        component="span"
        sx={{
          '&::after': {
            backgroundImage:
              'linear-gradient(to right, currentColor 2px, transparent 2px)',
            backgroundRepeat: 'repeat-x',
            backgroundSize: `4px 1px`,
            bottom: 0,
            content: '""',
            height: '1px',
            left: 0,
            pointerEvents: 'none',
            position: 'absolute',
            right: 0,
            transform: 'translateY(0.2em)',
          },
          position: 'relative',
        }}
      >
        {integer}
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            maxWidth: hovering ? '10em' : '0px',
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
