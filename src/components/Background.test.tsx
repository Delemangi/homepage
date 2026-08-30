import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { createAppTheme } from '../theme';
import Background from './Background';

const createMatchMedia =
  (matches: boolean) =>
  (query: string): MediaQueryList => ({
    addEventListener: () => {},
    addListener: () => {},
    dispatchEvent: () => false,
    matches,
    media: query,
    onchange: null,
    removeEventListener: () => {},
    removeListener: () => {},
  });

const renderBackground = () =>
  render(
    <ThemeProvider theme={createAppTheme('dark')}>
      <Background>Homepage</Background>
    </ThemeProvider>,
  );

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Background pointer feedback', () => {
  it('renders a decorative ripple at the click position', () => {
    vi.stubGlobal('matchMedia', createMatchMedia(false));
    renderBackground();

    fireEvent.click(screen.getByTestId('ambient-background'), {
      clientX: 42,
      clientY: 84,
    });

    expect(screen.getByTestId('ambient-ripple')).toHaveStyle({
      left: '42px',
      top: '84px',
    });
  });

  it('suppresses decorative ripples when reduced motion is requested', () => {
    vi.stubGlobal('matchMedia', createMatchMedia(true));
    renderBackground();

    fireEvent.click(screen.getByTestId('ambient-background'), {
      clientX: 42,
      clientY: 84,
    });

    expect(screen.queryByTestId('ambient-ripple')).not.toBeInTheDocument();
  });
});
