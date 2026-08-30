import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { IntroSequence } from '../components/IntroSequence';
import { ThemeModeProvider } from '../context/ThemeModeProvider';
import App from './App';
import Name from './Name';

const INTRO_OVERLAY_TEST_ID = 'intro-overlay';

afterEach(() => {
  vi.useRealTimers();
});

describe('App startup experience', () => {
  it('keeps proportional metrics on the measured title elements', () => {
    // Given
    vi.useFakeTimers();
    render(
      <ThemeModeProvider>
        <IntroSequence onComplete={vi.fn()} />
        <Name />
      </ThemeModeProvider>,
    );

    // When
    const introTitle = screen.getByTestId(
      INTRO_OVERLAY_TEST_ID,
    ).firstElementChild;
    const targetTitle =
      document.querySelector<HTMLElement>('#site-title-target');

    if (!(introTitle instanceof HTMLElement) || targetTitle === null) {
      throw new TypeError('Expected both measured title elements to render');
    }

    const introStyle = getComputedStyle(introTitle);
    const targetStyle = getComputedStyle(targetTitle);
    const introFontSize = Number.parseFloat(introStyle.fontSize);
    const targetFontSize = Number.parseFloat(targetStyle.fontSize);

    // Then
    expect(
      Number.parseFloat(introStyle.letterSpacing) / introFontSize,
    ).toBeCloseTo(
      Number.parseFloat(targetStyle.letterSpacing) / targetFontSize,
    );
    expect(introStyle.lineHeight).toBe(targetStyle.lineHeight);
    expect(
      Number.parseFloat(introStyle.paddingBottom) / introFontSize,
    ).toBeCloseTo(
      Number.parseFloat(targetStyle.paddingBottom) / targetFontSize,
    );
    expect(introStyle.paddingBottom).not.toBe('0px');
  });

  it('shows the intro on every mount and then reveals the homepage', () => {
    vi.useFakeTimers();

    const firstRender = render(
      <ThemeModeProvider>
        <App />
      </ThemeModeProvider>,
    );

    expect(screen.getByTestId(INTRO_OVERLAY_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId('homepage-content')).not.toHaveAttribute('inert');
    expect(screen.getByTestId('homepage-content')).not.toHaveAttribute(
      'aria-hidden',
    );
    expect(screen.getByTestId(INTRO_OVERLAY_TEST_ID)).toHaveAttribute(
      'data-phase',
      'entering',
    );
    expect(
      screen.queryByText('Portfolio system online'),
    ).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1_100);
    });

    expect(screen.getByTestId(INTRO_OVERLAY_TEST_ID)).toHaveAttribute(
      'data-phase',
      'handoff',
    );

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByTestId(INTRO_OVERLAY_TEST_ID)).toHaveAttribute(
      'data-phase',
      'exiting',
    );

    act(() => {
      vi.advanceTimersByTime(350);
    });

    expect(screen.queryByTestId(INTRO_OVERLAY_TEST_ID)).not.toBeInTheDocument();
    expect(screen.getByTestId('homepage-content')).not.toHaveAttribute('inert');
    expect(screen.getByTestId('homepage-content')).not.toHaveAttribute(
      'aria-hidden',
    );

    firstRender.unmount();

    render(
      <ThemeModeProvider>
        <App />
      </ThemeModeProvider>,
    );

    expect(screen.getByTestId(INTRO_OVERLAY_TEST_ID)).toBeInTheDocument();
  });

  it('lets keyboard users skip the decorative intro', () => {
    vi.useFakeTimers();

    render(
      <ThemeModeProvider>
        <App />
      </ThemeModeProvider>,
    );

    expect(screen.getByTestId(INTRO_OVERLAY_TEST_ID)).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByTestId(INTRO_OVERLAY_TEST_ID)).not.toBeInTheDocument();
  });
});
