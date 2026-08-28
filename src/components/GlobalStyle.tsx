import { Global } from '@emotion/react';
import { css, useTheme } from '@mui/material';

const keyFrames = css`
  @keyframes auroraSweep {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }

  ::view-transition-old(root) {
    animation: none;
    mix-blend-mode: normal;
  }

  ::view-transition-new(root) {
    animation: themeReveal 650ms cubic-bezier(0.16, 1, 0.3, 1);
    clip-path: circle(
      150% at var(--theme-origin-x, 100%) var(--theme-origin-y, 0%)
    );
    mix-blend-mode: normal;
  }

  @keyframes themeReveal {
    from {
      clip-path: circle(
        0 at var(--theme-origin-x, 100%) var(--theme-origin-y, 0%)
      );
      filter: blur(6px);
    }
    to {
      clip-path: circle(
        150% at var(--theme-origin-x, 100%) var(--theme-origin-y, 0%)
      );
      filter: blur(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *:not([data-motion='reduced-opacity']),
    *:not([data-motion='reduced-opacity'])::before,
    *:not([data-motion='reduced-opacity'])::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
  }

  html,
  body,
  * {
    scrollbar-width: thin;
  }

  html {
    background: #090b10;
  }

  body {
    margin: 0;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background: rgba(139, 157, 255, 0.28);
  }

  :root:not([data-theme='dark']) {
    scrollbar-color: rgba(238, 63, 113, 0.55) rgba(0, 0, 0, 0.06);
  }

  :root[data-theme='dark'] {
    scrollbar-color: rgba(106, 130, 251, 0.55) rgba(255, 255, 255, 0.06);
  }

  *::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  *::-webkit-scrollbar-corner {
    background: transparent;
  }
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

const GlobalStyle = () => {
  const theme = useTheme();

  return (
    <Global
      styles={[
        keyFrames,
        {
          ':focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 3,
          },
        },
      ]}
    />
  );
};

export default GlobalStyle;
