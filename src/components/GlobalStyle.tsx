import { Global } from '@emotion/react';
import { css } from '@mui/material';

const keyFrames = css`
  @keyframes auroraSweep {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }

  /* Global Scrollbar Styles */
  /* Firefox */
  html,
  body,
  * {
    scrollbar-width: thin;
  }

  /* Light mode (default) */
  :root:not([data-theme='dark']) {
    scrollbar-color: rgba(238, 63, 113, 0.55) rgba(0, 0, 0, 0.06);
  }

  /* Dark mode */
  :root[data-theme='dark'] {
    scrollbar-color: rgba(106, 130, 251, 0.55) rgba(255, 255, 255, 0.06);
  }

  /* WebKit/Blink */
  /* Base size */
  *::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  *::-webkit-scrollbar-corner {
    background: transparent;
  }
  /* Light mode visuals */
  :root:not([data-theme='dark']) *::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.06);
  }
  :root:not([data-theme='dark']) *::-webkit-scrollbar-thumb {
    background-color: rgba(238, 63, 113, 0.55);
    border-radius: 10px;
    border: 3px solid transparent;
    background-clip: content-box;
  }
  :root:not([data-theme='dark']) *::-webkit-scrollbar-thumb:hover {
    background-color: rgba(238, 63, 113, 0.7);
  }

  /* Dark mode visuals */
  :root[data-theme='dark'] *::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.06);
  }
  :root[data-theme='dark'] *::-webkit-scrollbar-thumb {
    background-color: rgba(106, 130, 251, 0.55);
    border-radius: 10px;
    border: 3px solid transparent;
    background-clip: content-box;
  }
  :root[data-theme='dark'] *::-webkit-scrollbar-thumb:hover {
    background-color: rgba(106, 130, 251, 0.72);
  }
`;

const GlobalStyle = () => <Global styles={keyFrames} />;

export default GlobalStyle;
