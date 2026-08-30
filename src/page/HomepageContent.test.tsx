import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { createAppTheme } from '../theme';
import Introduction from './Introduction';
import Portfolio from './Portfolio';

const CURRENT_WORK_PATTERN = /Software engineer at CodeChem/u;

const renderWithTheme = (content: Parameters<typeof render>[0]) =>
  render(
    <ThemeProvider theme={createAppTheme('light')}>{content}</ThemeProvider>,
  );

afterEach(() => {
  history.replaceState(null, '', '/');
});

describe('homepage content hierarchy', () => {
  it('opens with the wordmark instead of a resume-style identity line', () => {
    renderWithTheme(<Introduction />);

    expect(
      screen.queryByText(
        'STEFAN MILEV · SOFTWARE ENGINEER · SKOPJE, NORTH MACEDONIA',
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Delemangi' }),
    ).toBeInTheDocument();
  });

  it('presents current work without dashboard metadata', () => {
    renderWithTheme(<Introduction />);

    expect(screen.getByRole('complementary')).toHaveTextContent(
      CURRENT_WORK_PATTERN,
    );
    expect(screen.getByRole('link', { name: 'CodeChem' })).toHaveAttribute(
      'href',
      'https://codechem.com',
    );
    expect(screen.queryByText('Now')).not.toBeInTheDocument();
    expect(screen.queryByText('LOCAL TIME')).not.toBeInTheDocument();
    expect(screen.queryByText('AGE')).not.toBeInTheDocument();
    expect(screen.queryByText('CURRENT FOCUS')).not.toBeInTheDocument();
    expect(screen.queryByText('Product systems + AI')).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        'Available for thoughtful engineering conversations and open-source collaboration.',
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'View selected work' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Experience' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'GitHub profile' }),
    ).not.toBeInTheDocument();
  });

  it('presents one curated grid of maintained projects', () => {
    renderWithTheme(<Portfolio />);

    expect(
      screen.queryByText('Tools I use regularly.'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('SolidJS')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 3, name: 'More open source' }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4);
    expect(
      screen.getByRole('link', { name: 'View finki-hub source code' }),
    ).toHaveAttribute('href', 'https://github.com/finki-hub');
    expect(
      screen.getByRole('link', {
        name: 'View asf-discord-bot source code',
      }),
    ).toHaveAttribute('href', 'https://github.com/Delemangi/asf-discord-bot');
    const projectArticles = screen.getAllByRole('article');

    expect(projectArticles).toHaveLength(4);
    for (const article of projectArticles) {
      expect(article).toHaveStyle({ display: 'flex', height: '100%' });
    }
  });

  it('renders a hash-targeted heading without a delayed reveal transform', () => {
    history.replaceState(null, '', '/#portfolio-heading');

    renderWithTheme(<Portfolio />);

    const target = screen.getByRole('heading', {
      level: 2,
      name: 'Selected work',
    });
    const revealWrapper = target.parentElement;

    expect(revealWrapper).not.toBeNull();
    expect(revealWrapper).toHaveStyle({
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
    });
  });

  it('presents technology chips as static labels', () => {
    renderWithTheme(<Portfolio />);

    const label = screen.getAllByText('Node.js')[0];
    const chip = label?.closest('.MuiChip-root');

    expect(chip).not.toBeNull();
    expect(chip).toHaveStyle({ transform: 'none', transition: 'none' });
  });
});
