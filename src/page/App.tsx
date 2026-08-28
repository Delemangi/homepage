import { RouterProvider } from '@tanstack/react-router';
import { useState } from 'react';

import { IntroSequence } from '../components/IntroSequence';
import { router } from '../router';

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <div
        aria-hidden={showIntro ? true : undefined}
        data-testid="homepage-content"
        inert={showIntro ? true : undefined}
      >
        <RouterProvider router={router} />
      </div>
      {showIntro ? (
        <IntroSequence
          onComplete={() => {
            setShowIntro(false);
          }}
        />
      ) : null}
    </>
  );
};

export default App;
