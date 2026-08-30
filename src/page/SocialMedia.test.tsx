import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { createAppTheme } from '../theme';
import SocialMedia from './SocialMedia';

const originalClipboardDescriptor = Object.getOwnPropertyDescriptor(
  navigator,
  'clipboard',
);

afterEach(() => {
  if (originalClipboardDescriptor === undefined) {
    Reflect.deleteProperty(navigator, 'clipboard');
    return;
  }

  Object.defineProperty(navigator, 'clipboard', originalClipboardDescriptor);
});

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
    const status = screen.getByRole('status');

    expect(status).toBeEmptyDOMElement();

    await user.click(
      screen.getByRole('button', { name: 'Copy email address' }),
    );

    expect(writeText).toHaveBeenCalledWith('milev.stefan@gmail.com');
    expect(status).toHaveTextContent('Couldn’t copy email address. Try again.');
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

  it('renders the compact social controls in dark mode', () => {
    render(
      <ThemeProvider theme={createAppTheme('dark')}>
        <SocialMedia />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole('button', { name: 'Copy email address' }),
    ).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'Copy Discord username' }),
    ).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'Open GitHub profile' }),
    ).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'Open LinkedIn profile' }),
    ).toBeVisible();
    expect(screen.queryByText('Contact')).not.toBeInTheDocument();
    expect(screen.queryByText('Elsewhere')).not.toBeInTheDocument();
  });
});
