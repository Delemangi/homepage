import { useCallback, useEffect, useRef, useState } from 'react';

import { useReducedMotion } from './useReducedMotion';

const RANDOM_SET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const getRandomChar = () =>
  // eslint-disable-next-line sonarjs/pseudo-random -- Used for visual text scrambling effect, not security-sensitive
  RANDOM_SET[Math.floor(Math.random() * RANDOM_SET.length)];

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

export const useTextScramble = (target: string, duration = 700) => {
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState(target);
  const [, setIsRunning] = useState(false);
  const rafRef = useRef<null | number>(null);
  const isRunningRef = useRef(false);

  const start = useCallback(() => {
    if (reduceMotion) {
      setText(target);
      return;
    }

    if (isRunningRef.current) return;
    isRunningRef.current = true;
    setIsRunning(true);
    let begin: null | number = null;
    const n = target.length;
    const thresholds = Array.from({ length: n }, (_, i) =>
      // eslint-disable-next-line sonarjs/pseudo-random -- Used for visual text scrambling effect, not security-sensitive
      Math.min(0.95, Math.max(0.15, i / n + (Math.random() - 0.5) * (0.6 / n))),
    ).sort((a, b) => a - b);

    const tick = (now: number) => {
      begin ??= now;
      const t = Math.min(1, (now - begin) / duration);
      const eased = easeOutCubic(t);
      let out = '';

      for (let i = 0; i < n; i++) {
        const threshold = thresholds[i];
        if (threshold === undefined) {
          out += getRandomChar();
        } else {
          out += eased >= threshold ? target[i] : getRandomChar();
        }
      }

      setText(out);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setText(target);
        isRunningRef.current = false;
        setIsRunning(false);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [duration, reduceMotion, target]);

  useEffect(() => {
    if (!reduceMotion) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    isRunningRef.current = false;
  }, [reduceMotion]);

  useEffect(
    () => () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      isRunningRef.current = false;
    },
    [],
  );

  return {
    isRunning: !reduceMotion && isRunningRef.current,
    start,
    text: !reduceMotion && isRunningRef.current ? text : target,
  } as const;
};
