import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { createAppTheme } from '../theme';
import { ErrorFallback, NotFoundFallback } from './RouteFallback';

const renderFallback = (fallback: ReturnType<typeof NotFoundFallback>) =>
  render(
    <ThemeProvider theme={createAppTheme('dark')}>{fallback}</ThemeProvider>,
  );

describe('RouteFallback', () => {
  it('renders a branded not-found recovery page with one page heading', () => {
    renderFallback(<NotFoundFallback />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Return home' })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('renders an error recovery action with one page heading', () => {
    renderFallback(<ErrorFallback />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Something went wrong' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Refresh page' }),
    ).toBeInTheDocument();
  });
});
