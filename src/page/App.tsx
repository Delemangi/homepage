import { lazy, Suspense } from 'react';

import Animations from '../components/Animations';
import Background from '../components/Background';
import ColumnBox from '../components/ColumnBox';
import ColumnContainer from '../components/ColumnContainer';
import LoadingSpinner from '../components/LoadingSpinner';

const LazyIntroduction = lazy(() => import('./Introduction'));
const LazySocialMedia = lazy(() => import('./SocialMedia'));

const App = () => (
  <Background>
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
