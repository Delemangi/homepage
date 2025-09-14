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
          height: '95%',
          margin: 'auto',
          maxWidth: '50%',
        }}
      >
        <ColumnBox
          sx={{ animation: 'fadeInScale 1.2s cubic-bezier(.4, 1, .4, 1) both' }}
        >
          <LazyIntroduction />
          <LazySocialMedia />
        </ColumnBox>
      </ColumnContainer>
    </Suspense>
  </Background>
);

export default App;
