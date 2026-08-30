import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ThemeModeProvider } from '../context/ThemeModeProvider';
import App from './App';

vi.mock('../components/IntroSequence', () => ({
  IntroSequence: () => {
    throw new TypeError('Test render failure');
  },
}));

afterEach(() => {
  history.replaceState(null, '', '/');
  vi.restoreAllMocks();
});

describe('App render recovery', () => {
  it('shows the recovery page when an app child fails to render', () => {
    // Given
    history.replaceState(null, '', '/');
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // When
    render(
      <ThemeModeProvider>
        <App />
      </ThemeModeProvider>,
    );

    // Then
    expect(
      screen.getByRole('heading', { level: 1, name: 'Something went wrong' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Refresh page' })).toBeVisible();
  });
});
