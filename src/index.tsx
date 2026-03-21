import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import PreloaderGate from './components/PreloaderGate';
import { ThemeModeProvider } from './context/ThemeModeProvider';
import App from './page/App';

// eslint-disable-next-line no-console
console.log(
  '%cHello there! 👋\n%cPoking around? The source lives at %chttps://github.com/Delemangi/homepage',
  'color:#6a82fb;font-weight:700;font-size:14px',
  'color:inherit;font-size:12px',
  'color:#ee3f71;text-decoration:underline;font-size:12px',
);

const root = document.querySelector('#root');

if (root !== null) {
  createRoot(root).render(
    <StrictMode>
      <ThemeModeProvider>
        <PreloaderGate>
          <App />
        </PreloaderGate>
      </ThemeModeProvider>
    </StrictMode>,
  );
}
