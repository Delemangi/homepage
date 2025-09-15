import { lazy, Suspense } from 'react';

import Background from '../components/Background';
import ColumnBox from '../components/ColumnBox';
import ColumnContainer from '../components/ColumnContainer';
import FloatingBar from '../components/FloatingBar';
import GlobalStyle from '../components/GlobalStyle';
import LoadingSpinner from '../components/LoadingSpinner';
import SourceLinkButton from '../components/SourceLinkButton';
import ThemeToggle from '../components/ThemeToggle';
import { usePreloader } from '../hooks/usePreloader';

const LazyIntroduction = lazy(() => import('./Introduction'));
const LazySocialMedia = lazy(() => import('./SocialMedia'));
const LazyProfile = lazy(() => import('./Profile'));
const LazyProjects = lazy(() => import('./Projects'));

const App = () => {
  const { preloaderDone } = usePreloader();
  return (
    <Background>
      <FloatingBar>
        <ThemeToggle />
        <SourceLinkButton />
      </FloatingBar>
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
          }}
        >
          <ColumnBox
            sx={{
              animation: 'fadeInScale 1.2s cubic-bezier(.4, 1, .4, 1) both',
              animationPlayState: preloaderDone ? 'running' : 'paused',
            }}
          >
            <LazyIntroduction />
            <LazySocialMedia />
            <LazyProfile />
            <LazyProjects />
          </ColumnBox>
        </ColumnContainer>
      </Suspense>
    </Background>
  );
};

export default App;
