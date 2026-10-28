import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useTextScramble } from './useScramble';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useTextScramble', () => {
  it('prevents same-batch reentry and clears running state on completion', () => {
    const requestAnimationFrame = vi.fn<
      (callback: FrameRequestCallback) => number
    >(() => 1);
    vi.stubGlobal('requestAnimationFrame', requestAnimationFrame);
    const { result } = renderHook(() => useTextScramble('Delemangi'));

    act(() => {
      result.current.start();
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);
    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);

    act(() => {
      requestAnimationFrame.mock.calls[0]?.[0](0);
    });
    act(() => {
      requestAnimationFrame.mock.calls[1]?.[0](700);
    });

    expect(result.current.isRunning).toBe(false);
    expect(result.current.text).toBe('Delemangi');

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);
    expect(requestAnimationFrame).toHaveBeenCalledTimes(3);
  });

  it('keeps readable text static when reduced motion is requested', () => {
    const requestAnimationFrame = vi.fn();
    vi.stubGlobal('requestAnimationFrame', requestAnimationFrame);
    vi.stubGlobal(
      'matchMedia',
      vi.fn(
        (
          query: string,
        ): Omit<MediaQueryList, 'addListener' | 'removeListener'> => ({
          addEventListener: () => {},
          dispatchEvent: () => false,
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          removeEventListener: () => {},
        }),
      ),
    );
    const { result } = renderHook(() => useTextScramble('Delemangi'));

    act(() => {
      result.current.start();
    });

    expect(result.current.text).toBe('Delemangi');
    expect(result.current.isRunning).toBe(false);
    expect(requestAnimationFrame).not.toHaveBeenCalled();
  });

  it('stops an active scramble when reduced motion becomes enabled', () => {
    let matches = false;
    const mediaQueryEvents = new EventTarget();
    const mediaQueryList: Omit<
      MediaQueryList,
      'addListener' | 'removeListener'
    > = {
      addEventListener:
        mediaQueryEvents.addEventListener.bind(mediaQueryEvents),
      dispatchEvent: mediaQueryEvents.dispatchEvent.bind(mediaQueryEvents),
      get matches() {
        return matches;
      },
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      removeEventListener:
        mediaQueryEvents.removeEventListener.bind(mediaQueryEvents),
    };
    vi.stubGlobal('matchMedia', () => mediaQueryList);
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn(() => 1),
    );
    const cancelAnimationFrame = vi.fn();
    vi.stubGlobal('cancelAnimationFrame', cancelAnimationFrame);
    const { result } = renderHook(() => useTextScramble('Delemangi'));

    act(() => {
      result.current.start();
    });
    expect(result.current.isRunning).toBe(true);

    act(() => {
      matches = true;
      mediaQueryEvents.dispatchEvent(new Event('change'));
    });

    expect(cancelAnimationFrame).toHaveBeenCalledWith(1);
    expect(result.current.text).toBe('Delemangi');
    expect(result.current.isRunning).toBe(false);

    act(() => {
      matches = false;
      mediaQueryEvents.dispatchEvent(new Event('change'));
    });

    expect(result.current.text).toBe('Delemangi');
    expect(result.current.isRunning).toBe(false);

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);
  });
});
