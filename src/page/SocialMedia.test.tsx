import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';
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
      'Couldn’t copy email address. Try again.',
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
      'Discord username copied',
    );
  });

  it('keeps the newest clipboard result when an older attempt settles later', async () => {
    let rejectFirstWrite: (() => void) | undefined;
    const firstWrite = new Promise<void>((_resolve, reject) => {
      rejectFirstWrite = () => {
        reject(new Error('Denied'));
      };
    });
    const writeText = vi
      .fn()
      .mockImplementationOnce(() => firstWrite)
      .mockImplementationOnce(async () => {});
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    renderSocialMedia();

    fireEvent.click(screen.getByRole('button', { name: 'Copy email address' }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Copy Discord username' }),
    );
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Discord username copied',
    );

    if (rejectFirstWrite === undefined) {
      throw new TypeError('Expected the first clipboard write to be pending');
    }
    rejectFirstWrite();
    await expect(firstWrite).rejects.toThrow('Denied');

    expect(screen.getByRole('status')).toHaveTextContent(
      'Discord username copied',
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
