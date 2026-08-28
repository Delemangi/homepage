import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { createAppTheme } from '../theme';
import Introduction from './Introduction';
import Portfolio from './Portfolio';

const HERO_IDENTITY =
  'STEFAN MILEV · SOFTWARE ENGINEER · SKOPJE, NORTH MACEDONIA';
const LOCATION_SEGMENT = /^SKOPJE, NORTH MACEDONIA$/u;

const renderWithTheme = (content: Parameters<typeof render>[0]) =>
  render(
    <ThemeProvider theme={createAppTheme('light')}>{content}</ThemeProvider>,
  );

afterEach(() => {
  history.replaceState(null, '', '/');
});

describe('homepage content hierarchy', () => {
  it('presents the full identity and current work state', () => {
    renderWithTheme(<Introduction />);

    const accessibleIdentity = screen.getByText(HERO_IDENTITY);
    const visualIdentity = accessibleIdentity.parentElement?.querySelector(
      '[aria-hidden="true"]',
    );
    const identitySegments = Array.from(
      visualIdentity?.querySelectorAll(':scope > span') ?? [],
    );

    expect(accessibleIdentity).toHaveStyle({ position: 'absolute' });
    expect(visualIdentity).not.toBeNull();
    expect(identitySegments).toHaveLength(3);
    expect(visualIdentity?.querySelectorAll('wbr')).toHaveLength(2);
    for (const segment of identitySegments) {
      expect(segment).toHaveStyle({ whiteSpace: 'nowrap' });
    }
    expect(identitySegments[2]).toHaveTextContent(LOCATION_SEGMENT);
    expect(screen.getByText('Current state')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'CodeChem' })).toHaveAttribute(
      'href',
      'https://codechem.com',
    );
    expect(screen.getByText('AGE')).toBeInTheDocument();
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
      screen.queryByRole('heading', { level: 3, name: 'More open source' }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4);
    expect(
      screen.getByRole('link', { name: 'Open finki-hub' }),
    ).toHaveAttribute('href', 'https://github.com/finki-hub');
    expect(
      screen.getByRole('link', { name: 'Open asf-discord-bot' }),
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
      name: 'Projects & skills',
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
