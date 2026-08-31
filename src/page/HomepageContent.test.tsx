import { ThemeProvider } from '@mui/material';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ThemeModeProvider } from '../context/ThemeModeProvider';
import { createAppTheme } from '../theme';
import Homepage from './Homepage';
import Introduction from './Introduction';
import Portfolio from './Portfolio';
import Profile from './Profile';
import SiteFooter from './SiteFooter';
import Timeline from './Timeline';

const PROFILE_ENGINEERING_PATTERN =
  /frontend, backend, infrastructure, and AI/u;
const PRECISE_AGE_PATTERN = /^24\.\d{9} years old$/u;

const renderWithTheme = (content: Parameters<typeof render>[0]) =>
  render(
    <ThemeProvider theme={createAppTheme('light')}>{content}</ThemeProvider>,
  );

afterEach(() => {
  vi.useRealTimers();
  history.replaceState(null, '', '/');
  localStorage.removeItem('themePreference');
  Reflect.deleteProperty(document.documentElement.dataset, 'theme');
  Reflect.deleteProperty(document.documentElement.dataset, 'themePreference');
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

  it('presents a concise identity without dashboard metadata', () => {
    renderWithTheme(<Introduction />);

    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'CodeChem' }),
    ).not.toBeInTheDocument();
    expect(screen.getByText('web apps').closest('p')).toHaveTextContent(
      'I build software, from web apps to cloud infrastructure.',
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
      screen.getByRole('link', { name: 'Open GitHub profile' }),
    ).toHaveAttribute('href', 'https://github.com/Delemangi/');
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
      screen.getByRole('link', { name: 'View finki-hub live site' }),
    ).toHaveAttribute('href', 'https://finki-hub.com');
    expect(
      screen.getByText(
        'A community platform of apps, bots, and scrapers that helps FCSE students find the university information they need and automate routine tasks.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('My personal homepage. You are currently here.'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: 'View asf-discord-bot source code',
      }),
    ).toHaveAttribute('href', 'https://github.com/Delemangi/asf-discord-bot');
    expect(
      screen.getByRole('link', {
        name: 'View eslint-config-imperium package',
      }),
    ).toHaveAttribute(
      'href',
      'https://www.npmjs.com/package/eslint-config-imperium',
    );
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

  it('sizes the timeline surface to its content', () => {
    render(
      <ThemeModeProvider>
        <Homepage />
      </ThemeModeProvider>,
    );

    expect(
      screen.getByRole('region', { name: 'Experience & education' }),
    ).toHaveStyle({ height: 'auto' });
  });
});

describe('supporting homepage content', () => {
  it('covers the approved engineering and community interests', () => {
    renderWithTheme(<Profile />);

    expect(screen.getByText(PROFILE_ENGINEERING_PATTERN)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'finki-hub' })).toHaveAttribute(
      'href',
      'https://finki-hub.com',
    );
    expect(screen.getByRole('link', { name: 'learnify.mk' })).toHaveAttribute(
      'href',
      'https://learnify.mk',
    );
  });

  it('links timeline organizations and every footer destination', () => {
    renderWithTheme(
      <>
        <Timeline />
        <SiteFooter />
      </>,
    );

    expect(screen.getByRole('link', { name: 'CodeChem' })).toHaveAttribute(
      'href',
      'https://codechem.com',
    );
    expect(
      screen.getAllByRole('link', {
        name: 'Faculty of Computer Science and Engineering',
      }),
    ).toHaveLength(2);

    const footer = within(screen.getByRole('contentinfo'));
    expect(
      footer.getByText('Software engineer based in Skopje, North Macedonia'),
    ).toBeInTheDocument();
    expect(footer.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      'mailto:milev.stefan@gmail.com',
    );
    expect(footer.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/Delemangi',
    );
    expect(footer.getByRole('link', { name: 'Discord' })).toHaveAttribute(
      'href',
      'https://discord.gg/7Fw53MdbUP',
    );
    expect(footer.getByRole('link', { name: 'Steam' })).toHaveAttribute(
      'href',
      'https://steamcommunity.com/id/delemangi/',
    );
    expect(footer.getByRole('link', { name: 'Source' })).toHaveAttribute(
      'href',
      'https://github.com/Delemangi/homepage',
    );
  });

  it('discloses a live precise age through pointer, keyboard, and touch input', () => {
    vi.useFakeTimers();
    vi.setSystemTime(1_767_225_600_000);
    renderWithTheme(<SiteFooter />);

    const age = screen.getByRole('button', { name: '24 years old' });

    fireEvent.mouseEnter(age);
    expect(age).toHaveTextContent(PRECISE_AGE_PATTERN);

    const preciseAge = age.textContent;
    act(() => {
      vi.advanceTimersByTime(1_000);
    });
    expect(age).not.toHaveTextContent(preciseAge);

    fireEvent.mouseLeave(age);
    expect(age).toHaveTextContent('24 years old');

    fireEvent.focus(age);
    expect(age).toHaveTextContent(PRECISE_AGE_PATTERN);
    fireEvent.blur(age);
    expect(age).toHaveTextContent('24 years old');

    fireEvent.click(age);
    expect(age).toHaveTextContent(PRECISE_AGE_PATTERN);
  });

  it('increments completed years at the exact UTC anniversary', () => {
    vi.useFakeTimers();
    vi.setSystemTime(1_796_684_399_000);
    renderWithTheme(<SiteFooter />);

    expect(screen.getByRole('button', { name: '24 years old' })).toBeVisible();

    act(() => {
      vi.advanceTimersByTime(1_000);
    });
    expect(screen.getByRole('button', { name: '25 years old' })).toBeVisible();

    act(() => {
      vi.advanceTimersByTime(1_000);
    });
    expect(screen.getByRole('button', { name: '25 years old' })).toBeVisible();
  });
});
