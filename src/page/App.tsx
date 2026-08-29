import { RouterProvider } from '@tanstack/react-router';
import { useState } from 'react';

import { IntroSequence } from '../components/IntroSequence';
import { router } from '../router';

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <div data-testid="homepage-content">
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
