import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { createAppTheme } from '../theme';
import SocialMedia from './SocialMedia';

const renderSocialMedia = () =>
  render(
    <ThemeProvider theme={createAppTheme('light')}>
      <SocialMedia />
    </ThemeProvider>,
  );

describe('SocialMedia', () => {
  it('reports clipboard failures instead of claiming success', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockRejectedValue(new Error('Denied'));
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    renderSocialMedia();

    await user.click(
      screen.getByRole('button', { name: 'Copy email address' }),
    );

    expect(writeText).toHaveBeenCalledWith('milev.stefan@gmail.com');
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Could not copy to clipboard',
    );
    expect(
      screen.getByRole('button', { name: 'Copy email address' }),
    ).toHaveFocus();
  });

  it('announces a successful clipboard write', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    renderSocialMedia();

    await user.click(
      screen.getByRole('button', { name: 'Copy Discord username' }),
    );

    expect(writeText).toHaveBeenCalledWith('delemangi');
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Copied to clipboard',
    );
  });

  it('uses the Aurora contact and navigation accents in dark mode', () => {
    render(
      <ThemeProvider theme={createAppTheme('dark')}>
        <SocialMedia />
      </ThemeProvider>,
    );

    expect(screen.getByText('Contact')).toHaveStyle({ color: '#53e6c3' });
    expect(screen.getByText('Elsewhere')).toHaveStyle({ color: '#8b9dff' });
  });
});
