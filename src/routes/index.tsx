import { createRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

import Background from '../components/Background';
import ColumnBox from '../components/ColumnBox';
import ColumnContainer from '../components/ColumnContainer';
import FloatingBar from '../components/FloatingBar';
import GlobalStyle from '../components/GlobalStyle';
import LoadingSpinner from '../components/LoadingSpinner';
import SourceLinkButton from '../components/SourceLinkButton';
import StaggeredReveal from '../components/StaggeredReveal';
import TerminalHint from '../components/terminal/TerminalHint';
import TerminalToggle from '../components/terminal/TerminalToggle';
import ThemeToggle from '../components/ThemeToggle';
import { Route as RootRoute } from './__root';

const LazyIntroduction = lazy(() => import('../page/Introduction'));
const LazySocialMedia = lazy(() => import('../page/SocialMedia'));
const LazyProfile = lazy(() => import('../page/Profile'));
const LazyProjects = lazy(() => import('../page/Projects'));

const IndexPage = () => (
  <Background>
    <FloatingBar>
      <ThemeToggle />
      <TerminalToggle />
      <SourceLinkButton />
    </FloatingBar>
    <TerminalHint />
    <GlobalStyle />
    <Suspense fallback={<LoadingSpinner />}>
      <ColumnContainer
        sx={{
          justifyContent: {
            sm: 'center',
            xs: 'flex-start',
          },
          margin: 'auto',
          maxWidth: {
            lg: '44%',
            md: '70%',
            sm: '85%',
            xl: '38%',
            xs: '92%',
          },
          minHeight: {
            sm: '95svh',
            xs: '100svh',
          },
          paddingBottom: {
            sm: 4,
            xs: 3,
          },
          paddingTop: {
            sm: 6,
            xs: 4,
          },
          paddingX: {
            sm: 0,
            xs: 2,
          },
          scrollBehavior: 'smooth',
          scrollSnapType: 'y proximity',
        }}
      >
        <ColumnBox>
          <StaggeredReveal delay={0}>
            <LazyIntroduction />
          </StaggeredReveal>
          <StaggeredReveal delay={150}>
            <LazySocialMedia />
          </StaggeredReveal>
          <StaggeredReveal delay={300}>
            <LazyProfile />
          </StaggeredReveal>
          <StaggeredReveal delay={450}>
            <LazyProjects />
          </StaggeredReveal>
        </ColumnBox>
      </ColumnContainer>
    </Suspense>
  </Background>
);

export const Route = createRoute({
  component: IndexPage,
  getParentRoute: () => RootRoute,
  path: '/',
});
