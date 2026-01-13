import { type PropsWithChildren, useEffect, useRef, useState } from 'react';

import { PreloaderProvider } from '../context/PreloaderProvider';
import Preloader from './Preloader';

type Stage = 'done' | 'fading' | 'loading';

const HEX_DURATION_MS = 900;
const FADE_DURATION_MS = 300;
const MAX_WAIT_MS = 2_200;

const PreloaderGate = ({ children }: PropsWithChildren) => {
  const [stage, setStage] = useState<Stage>('loading');
  const startRef = useRef<number>(Date.now());
  const timers = useRef<number[]>([]);

  useEffect(() => {
    let cancelled = false;
    let minElapsed = false;
    let prefetched = false;

    const maybeProceed = () => {
      if (cancelled) return;

      const elapsed = Date.now() - startRef.current;

      if (minElapsed && (prefetched || elapsed >= MAX_WAIT_MS)) {
        setStage('fading');

        timers.current.push(
          setTimeout(() => {
            if (!cancelled) setStage('done');
          }, FADE_DURATION_MS),
        );
      }
    };

    timers.current.push(
      setTimeout(() => {
        minElapsed = true;
        maybeProceed();
      }, HEX_DURATION_MS),
    );

    void Promise.allSettled([
      import('../page/Introduction'),
      import('../page/SocialMedia'),
      import('../page/Profile'),
      import('../page/Timeline'),
      import('../page/Portfolio'),
    ])
      .catch(() => {})
      .finally(() => {
        prefetched = true;
        maybeProceed();
      });

    return () => {
      cancelled = true;

      for (const t of timers.current) {
        clearTimeout(t);
      }

      timers.current = [];
    };
  }, []);

  return (
    <PreloaderProvider value={stage !== 'loading'}>
      {children}
      {stage === 'loading' || stage === 'fading' ? (
        <Preloader fading={stage === 'fading'} />
      ) : null}
    </PreloaderProvider>
  );
};

export default PreloaderGate;
