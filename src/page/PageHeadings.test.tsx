import type { ReactNode } from 'react';

import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { createAppTheme } from '../theme';
import Name from './Name';
import Portfolio from './Portfolio';
import Profile from './Profile';
import Timeline from './Timeline';

const renderWithTheme = (content: ReactNode) =>
  render(
    <ThemeProvider theme={createAppTheme('light')}>{content}</ThemeProvider>,
  );

describe('page heading hierarchy', () => {
  it('uses the site title as the page heading', () => {
    renderWithTheme(<Name />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Delemangi' }),
    ).toBeInTheDocument();
  });

  it.each([
    ['About', <Profile key="profile" />],
    ['Experience & education', <Timeline key="timeline" />],
    ['Projects & skills', <Portfolio key="portfolio" />],
  ])('uses an h2 for the %s section', (name, section) => {
    renderWithTheme(section);

    expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
  });
});
