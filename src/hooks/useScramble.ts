import { useCallback, useEffect, useRef, useState } from 'react';

const RANDOM_SET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const getRandomChar = () =>
  RANDOM_SET[Math.floor(Math.random() * RANDOM_SET.length)];

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

export const useTextScramble = (target: string, duration = 700) => {
  const [text, setText] = useState(target);
  const [isRunning, setIsRunning] = useState(false);
  const rafRef = useRef<null | number>(null);
  const isRunningRef = useRef(false);

  const start = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    setIsRunning(true);
    let begin: null | number = null;
    const n = target.length;
    const thresholds = Array.from({ length: n }, (_, i) =>
      Math.min(0.95, Math.max(0.15, i / n + (Math.random() - 0.5) * (0.6 / n))),
    ).sort((a, b) => a - b);

    const tick = (now: number) => {
      begin ??= now;
      const t = Math.min(1, (now - begin) / duration);
      const eased = easeOutCubic(t);
      let out = '';

      for (let i = 0; i < n; i++) {
        out += eased >= thresholds[i] ? target[i] : getRandomChar();
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
  }, [duration, target]);

  useEffect(
    () => () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      isRunningRef.current = false;
    },
    [],
  );

  return { isRunning, start, text } as const;
};
