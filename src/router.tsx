import { createRouter } from '@tanstack/react-router';

import { Route as RootRoute } from './routes/__root';
import { Route as IndexRoute } from './routes/index';
import { Route as TerminalRoute } from './routes/terminal';

const routeTree = RootRoute.addChildren([IndexRoute, TerminalRoute]);

export const router = createRouter({ routeTree });
