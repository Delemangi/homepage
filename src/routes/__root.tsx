import { createRootRoute, Outlet } from '@tanstack/react-router';

import { ErrorFallback, NotFoundFallback } from '../components/RouteFallback';

export const Route = createRootRoute({
  component: () => <Outlet />,
  errorComponent: ErrorFallback,
  notFoundComponent: NotFoundFallback,
});
