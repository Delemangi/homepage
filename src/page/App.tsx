import { RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';

import { router } from '../router';

const App = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        const isTerminal = window.location.pathname === '/terminal';
        void router.navigate({ to: isTerminal ? '/' : '/terminal' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
