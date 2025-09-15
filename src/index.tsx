import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import PreloaderGate from './components/PreloaderGate';
import App from './page/App';
import ThemeModeProvider from './theme/ThemeModeProvider';

// eslint-disable-next-line no-console
console.log(
  '%cHello there! 👋\n%cPoking around? The source lives at %chttps://github.com/Delemangi/homepage',
  'color:#6a82fb;font-weight:700;font-size:14px',
  'color:inherit;font-size:12px',
  'color:#ee3f71;text-decoration:underline;font-size:12px',
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <ThemeModeProvider>
      <PreloaderGate>
        <App />
      </PreloaderGate>
    </ThemeModeProvider>
  </StrictMode>,
);
