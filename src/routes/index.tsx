import { Box, type Theme } from '@mui/material';
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

const readingSurfaceSx = {
  backdropFilter: 'blur(20px) saturate(125%)',
  backgroundColor: (theme: Theme) =>
    theme.palette.mode === 'dark'
      ? 'rgba(17, 20, 28, 0.72)'
      : 'rgba(255, 255, 255, 0.72)',
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 3,
  boxShadow: (theme: Theme) =>
    theme.palette.mode === 'dark'
      ? '0 24px 72px rgba(0, 0, 0, 0.26), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      : '0 24px 72px rgba(61, 28, 43, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.88)',
  height: '100%',
  padding: { md: 4, xs: 3 },
} as const;

const IndexPage = () => (
  <Background>
    <nav aria-label="Site controls">
      <FloatingBar
        sx={{
          position: { md: 'fixed', xs: 'absolute' },
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
    <Box
      component="main"
      sx={{ position: 'relative', zIndex: 1 }}
    >
      <ColumnContainer
        maxWidth={false}
        sx={{
          '@media (prefers-reduced-motion: reduce)': {
            scrollBehavior: 'auto',
          },
          margin: 'auto',
          minHeight: '100svh',
          paddingBottom: { md: 12, xs: 8 },
          paddingTop: { md: 12, xs: 10 },
          paddingX: 0,
          scrollBehavior: 'smooth',
        }}
      >
        <ColumnBox>
          <Box component="header">
            <StaggeredReveal delay={0}>
              <Introduction />
            </StaggeredReveal>
            <StaggeredReveal delay={150}>
              <SocialMedia />
            </StaggeredReveal>
          </Box>
          <Box
            sx={{
              alignItems: 'stretch',
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { md: '0.82fr 1.18fr', xs: '1fr' },
            }}
          >
            <StaggeredReveal delay={300}>
              <Box
                aria-labelledby="about-heading"
                component="section"
                sx={readingSurfaceSx}
              >
                <Profile />
              </Box>
            </StaggeredReveal>
            <StaggeredReveal delay={450}>
              <Box
                aria-labelledby="timeline-heading"
                component="section"
                sx={readingSurfaceSx}
              >
                <Timeline />
              </Box>
            </StaggeredReveal>
          </Box>
          <StaggeredReveal delay={600}>
            <Box
              aria-labelledby="portfolio-heading"
              component="section"
            >
              <Portfolio />
            </Box>
          </StaggeredReveal>
        </ColumnBox>
      </ColumnContainer>
    </Box>
  </Background>
);

const route = createRoute({
  component: IndexPage,
  getParentRoute: () => RootRoute,
  path: '/',
});

export { route as Route };
