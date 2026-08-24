import { createRoute } from '@tanstack/react-router';

import Background from '../components/Background';
import ColumnBox from '../components/ColumnBox';
import ColumnContainer from '../components/ColumnContainer';
import FloatingBar from '../components/FloatingBar';
import GlobalStyle from '../components/GlobalStyle';
import SourceLinkButton from '../components/SourceLinkButton';
import StaggeredReveal from '../components/StaggeredReveal';
import ThemeToggle from '../components/ThemeToggle';
import Introduction from '../page/Introduction';
import Portfolio from '../page/Portfolio';
import Profile from '../page/Profile';
import SocialMedia from '../page/SocialMedia';
import Timeline from '../page/Timeline';
import { Route as RootRoute } from './__root';

const IndexPage = () => (
  <Background>
    <nav aria-label="Site controls">
      <FloatingBar
        sx={{
          position: { sm: 'fixed', xs: 'absolute' },
          top: {
            sm: 12,
            xs: 'max(12px, env(safe-area-inset-top, 0px) + 12px)',
          },
        }}
      >
        <ThemeToggle />
        <SourceLinkButton />
      </FloatingBar>
    </nav>
    <GlobalStyle />
    <main>
      <ColumnContainer
        sx={{
          '@media (prefers-reduced-motion: reduce)': {
            scrollBehavior: 'auto',
          },
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
            xs: 8,
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
          <header>
            <StaggeredReveal delay={0}>
              <Introduction />
            </StaggeredReveal>
            <StaggeredReveal delay={150}>
              <SocialMedia />
            </StaggeredReveal>
          </header>
          <StaggeredReveal delay={300}>
            <Profile />
          </StaggeredReveal>
          <StaggeredReveal delay={450}>
            <Timeline />
          </StaggeredReveal>
          <StaggeredReveal delay={600}>
            <Portfolio />
          </StaggeredReveal>
        </ColumnBox>
      </ColumnContainer>
    </main>
  </Background>
);

const route = createRoute({
  component: IndexPage,
  getParentRoute: () => RootRoute,
  path: '/',
});

export { route as Route };
