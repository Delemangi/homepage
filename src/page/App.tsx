import { lazy, Suspense } from 'react';

import Animations from '../components/Animations';
import Background from '../components/Background';
import ColumnBox from '../components/ColumnBox';
import ColumnContainer from '../components/ColumnContainer';
import FloatingBar from '../components/FloatingBar';
import LoadingSpinner from '../components/LoadingSpinner';
import SourceLinkButton from '../components/SourceLinkButton';
import ThemeToggle from '../components/ThemeToggle';

const LazyIntroduction = lazy(() => import('./Introduction'));
const LazySocialMedia = lazy(() => import('./SocialMedia'));
const LazyAbout = lazy(() => import('./About'));

const App = () => (
  <Background>
    <FloatingBar>
      <ThemeToggle />
      <SourceLinkButton />
    </FloatingBar>
    <Animations />
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
            sm: 8,
            xs: 6,
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
          sx={{ animation: 'fadeInScale 1.2s cubic-bezier(.4, 1, .4, 1) both' }}
        >
          <LazyIntroduction />
          <LazySocialMedia />
          <LazyAbout />
        </ColumnBox>
      </ColumnContainer>
    </Suspense>
  </Background>
);

export default App;
