import { Typography, type TypographyProps } from '@mui/material';
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
  const [age, setAge] = useState(getAge());
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAge());
    }, 1_000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Typography
      fontSize={16}
      sx={{
        textDecoration: 'underline',
        textDecorationStyle: 'dotted',
        textUnderlineOffset: '0.2em',
      }}
      {...props}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
    >
      {hovering ? age : Math.floor(Number(age))} years old
    </Typography>
  );
};

export default Age;
