import { Button } from '@mui/material';
import { useState } from 'react';

import { AppErrorBoundary } from '../components/AppErrorBoundary';
import { IntroSequence } from '../components/IntroSequence';
import { NotFoundFallback } from '../components/RouteFallback';
import Homepage from './Homepage';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const isHomepage = location.pathname === '/';
  const showIntroOverlay = isHomepage && showIntro;

  return (
    <AppErrorBoundary>
      <div
        data-testid="homepage-content"
        inert={showIntroOverlay ? true : undefined}
      >
        {isHomepage ? <Homepage /> : <NotFoundFallback />}
      </div>
      {showIntroOverlay ? (
        <>
          <Button
            aria-label="Skip intro"
            autoFocus
            onClick={() => {
              setShowIntro(false);
            }}
            size="small"
            sx={{
              '&:focus-visible': {
                outline: '2px solid currentColor',
                outlineOffset: 2,
              },
              borderRadius: 10,
              position: 'fixed',
              right: 'max(16px, env(safe-area-inset-right, 0px) + 16px)',
              textTransform: 'none',
              top: 'max(16px, env(safe-area-inset-top, 0px) + 16px)',
              zIndex: 1_500,
            }}
            variant="contained"
          >
            Skip intro
          </Button>
          <IntroSequence
            onComplete={() => {
              setShowIntro(false);
            }}
          />
        </>
      ) : null}
    </AppErrorBoundary>
  );
}
