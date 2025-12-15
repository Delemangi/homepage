import { createRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

import GlobalStyle from '../components/GlobalStyle';
import LoadingSpinner from '../components/LoadingSpinner';
import { Route as RootRoute } from './__root';

const LazyTerminalMode = lazy(() => import('../page/TerminalMode'));

const TerminalPage = () => (
  <>
    <GlobalStyle />
    <Suspense fallback={<LoadingSpinner />}>
      <LazyTerminalMode />
    </Suspense>
  </>
);

const route = createRoute({
  component: TerminalPage,
  getParentRoute: () => RootRoute,
  path: '/terminal',
});

export { route as Route };
