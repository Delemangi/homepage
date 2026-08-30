import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

Object.defineProperties(globalThis, {
  IntersectionObserver: {
    configurable: true,
    value: class {
      readonly observedElements = new Set<Element>();

      disconnect = () => {
        this.observedElements.clear();
      };

      observe = (element: Element) => {
        this.observedElements.add(element);
      };

      takeRecords = () => {
        this.observedElements.clear();

        return [];
      };

      unobserve = (element: Element) => {
        this.observedElements.delete(element);
      };
    },
  },
  matchMedia: {
    configurable: true,
    value: (query: string): MediaQueryList => ({
      addEventListener: () => {},
      addListener: () => {},
      dispatchEvent: () => false,
      matches: false,
      media: query,
      onchange: null,
      removeEventListener: () => {},
      removeListener: () => {},
    }),
  },
});
