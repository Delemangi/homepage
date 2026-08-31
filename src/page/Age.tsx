import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

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
  const [pointerPressed, setPointerPressed] = useState(false);
  const pointerFocusRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAge());
    }, 1_000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const showPrecision = focused || hovered || pointerPressed;
  const preciseAge = age.toFixed(9);
  const decimalIndex = preciseAge.indexOf('.');
  const integerAge = preciseAge.slice(0, decimalIndex);
  const decimalAge = preciseAge.slice(decimalIndex);
  const accessibleAge = showPrecision ? preciseAge : integerAge;

  return (
    <Typography
      aria-label={`${accessibleAge} years old`}
      component="button"
      onBlur={() => {
        setFocused(false);
      }}
      onClick={(event) => {
        if (event.detail === 0) return;
        setFocused(false);
        setHovered(false);
        event.currentTarget.blur();
      }}
      onFocus={() => {
        if (!pointerFocusRef.current) setFocused(true);
      }}
      onPointerCancel={() => {
        setPointerPressed(false);
        pointerFocusRef.current = false;
      }}
      onPointerDown={() => {
        setPointerPressed(true);
        pointerFocusRef.current = true;
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setHovered(true);
      }}
      onPointerLeave={(event) => {
        setPointerPressed(false);
        pointerFocusRef.current = false;
        if (event.pointerType === 'mouse') setHovered(false);
      }}
      onPointerUp={() => {
        setPointerPressed(false);
        pointerFocusRef.current = false;
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
      {integerAge}
      <Box
        aria-hidden="true"
        component="span"
        sx={{
          '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
          },
          display: 'inline-block',
          maxWidth: showPrecision ? '10em' : '0px',
          overflow: 'hidden',
          transition: (theme) =>
            theme.transitions.create('max-width', {
              duration: theme.transitions.duration.short,
              easing: theme.transitions.easing.easeInOut,
            }),
          verticalAlign: 'bottom',
          whiteSpace: 'nowrap',
        }}
      >
        {decimalAge}
      </Box>{' '}
      years old
    </Typography>
  );
};

export default Age;
