import { createRouter } from '@tanstack/react-router';

import { Route as RootRoute } from './routes/__root';
import { Route as IndexRoute } from './routes/index';
const routeTree = RootRoute.addChildren([IndexRoute]);

export const router = createRouter({ routeTree });
