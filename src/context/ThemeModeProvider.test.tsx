import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ThemeModeProvider } from './ThemeModeProvider';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ThemeModeProvider', () => {
  it('renders when browser storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage blocked');
    });

    render(
      <ThemeModeProvider>
        <div>content</div>
      </ThemeModeProvider>,
    );

    expect(screen.getByText('content')).toBeVisible();
    expect(document.documentElement.dataset['theme']).toBe('light');
  });
});
