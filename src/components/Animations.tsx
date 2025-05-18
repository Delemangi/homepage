import { Global } from '@emotion/react';
import { css } from '@mui/material';

const keyFrames = css`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeInMoveUp {
    0% {
      opacity: 0;
      transform: translateY(1.5rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInScale {
    0% {
      opacity: 0;
      transform: scale(0.96);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeInStaggered {
    0% {
      opacity: 0;
      transform: translateY(2rem) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes auroraSweep {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`;

const Animations = () => <Global styles={keyFrames} />;

export default Animations;
