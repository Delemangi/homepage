import { Component, type ErrorInfo, type ReactNode } from 'react';

import { ErrorFallback } from './RouteFallback';

type AppErrorBoundaryProps = Readonly<{
  children: ReactNode;
}>;

type AppErrorBoundaryState = Readonly<{
  hasError: boolean;
}>;

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  override state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  // eslint-disable-next-line class-methods-use-this -- React lifecycle hook
  override componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console -- Surface render failures for diagnostics
    console.error('Unhandled render error', error, info.componentStack);
  }

  override render() {
    return this.state.hasError ? <ErrorFallback /> : this.props.children;
  }
}
