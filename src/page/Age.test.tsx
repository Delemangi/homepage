import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { BIRTH_INSTANT } from '../constants';
import { createAppTheme } from '../theme';
import Age from './Age';

const MILLISECONDS_PER_YEAR = 1_000 * 60 * 60 * 24 * 365.25;

afterEach(() => {
  vi.useRealTimers();
});

describe('Age', () => {
  it('uses the same elapsed time regardless of the viewer timezone', () => {
    vi.useFakeTimers();
    vi.setSystemTime(1_787_486_400_000);
    const expected = (
      (Date.now() - BIRTH_INSTANT) /
      MILLISECONDS_PER_YEAR
    ).toFixed(9);

    const { container } = render(
      <ThemeProvider theme={createAppTheme('light')}>
        <Age />
      </ThemeProvider>,
    );

    expect(container).toHaveTextContent(`${expected} years old`);
  });
});
