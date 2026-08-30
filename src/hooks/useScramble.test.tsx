import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useTextScramble } from './useScramble';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useTextScramble', () => {
  it('keeps readable text static when reduced motion is requested', () => {
    const requestAnimationFrame = vi.fn();
    vi.stubGlobal('requestAnimationFrame', requestAnimationFrame);
    vi.stubGlobal(
      'matchMedia',
      vi.fn(
        (query: string): MediaQueryList => ({
          addEventListener: () => {},
          addListener: () => {},
          dispatchEvent: () => false,
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          removeEventListener: () => {},
          removeListener: () => {},
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
    const mediaQueryList: MediaQueryList = {
      addEventListener:
        mediaQueryEvents.addEventListener.bind(mediaQueryEvents),
      addListener: () => {},
      dispatchEvent: mediaQueryEvents.dispatchEvent.bind(mediaQueryEvents),
      get matches() {
        return matches;
      },
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      removeEventListener:
        mediaQueryEvents.removeEventListener.bind(mediaQueryEvents),
      removeListener: () => {},
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
  });
});
