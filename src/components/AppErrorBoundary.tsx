import { Component, type ReactNode } from 'react';

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

  override render() {
    return this.state.hasError ? <ErrorFallback /> : this.props.children;
  }
}
