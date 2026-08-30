import { useState } from 'react';

import { AppErrorBoundary } from '../components/AppErrorBoundary';
import { IntroSequence } from '../components/IntroSequence';
import { NotFoundFallback } from '../components/RouteFallback';
import Homepage from './Homepage';

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const isHomepage = location.pathname === '/';

  return (
    <AppErrorBoundary>
      <div data-testid="homepage-content">
        {isHomepage ? <Homepage /> : <NotFoundFallback />}
      </div>
      {isHomepage && showIntro ? (
        <IntroSequence
          onComplete={() => {
            setShowIntro(false);
          }}
        />
      ) : null}
    </AppErrorBoundary>
  );
};

export default App;
