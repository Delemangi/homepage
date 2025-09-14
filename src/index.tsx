import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './page/App';
import ThemeModeProvider from './theme/ThemeModeProvider';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <ThemeModeProvider>
      <App />
    </ThemeModeProvider>
  </StrictMode>,
);
