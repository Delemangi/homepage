import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { BIRTH_INSTANT } from '../constants';

const BIRTH_YEAR = 2_001;
const MILLISECONDS_PER_DAY = 86_400_000;

const isLeapYear = (year: number) =>
  year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

const getAge = () => {
  const now = Date.now();
  let completedYears = 0;
  let previousAnniversary = BIRTH_INSTANT;
  let nextAnniversary = previousAnniversary;

  while (nextAnniversary <= now) {
    previousAnniversary = nextAnniversary;
    completedYears += 1;
    const daysInAgeYear = isLeapYear(BIRTH_YEAR + completedYears) ? 366 : 365;
    nextAnniversary += daysInAgeYear * MILLISECONDS_PER_DAY;
  }

  completedYears -= 1;
  const anniversaryProgress =
    (now - previousAnniversary) / (nextAnniversary - previousAnniversary);

  return completedYears + anniversaryProgress;
};

const Age = () => {
  const [age, setAge] = useState(getAge);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAge());
    }, 1_000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const showPrecision = focused || hovered || pressed;
  const displayedAge = showPrecision
    ? age.toFixed(9)
    : Math.floor(age).toString();

  return (
    <Typography
      aria-label={`${displayedAge} years old`}
      component="button"
      onBlur={() => {
        setFocused(false);
        setPressed(false);
      }}
      onClick={() => {
        setPressed(true);
      }}
      onFocus={() => {
        setFocused(true);
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      sx={{
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: '2px',
        },
        appearance: 'none',
        background: 'none',
        border: 0,
        borderRadius: 0.5,
        color: 'text.secondary',
        cursor: 'pointer',
        display: 'block',
        fontFamily: '"Kode Mono", ui-monospace, monospace',
        fontSize: 12,
        margin: 0,
        marginTop: 0.5,
        minWidth: '22ch',
        padding: 0,
        textAlign: 'left',
        textDecorationLine: 'underline',
        textDecorationStyle: 'dotted',
        textUnderlineOffset: '0.25em',
      }}
      type="button"
    >
      {displayedAge} years old
    </Typography>
  );
};

export default Age;
