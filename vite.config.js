import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const cfAsyncPlugin = () => ({
  name: 'cf-async',
  transformIndexHtml(html) {
    return html.replaceAll(
      /<script\s+type="module"(?![^>]*data-cfasync)/gu,
      '<script data-cfasync="false" type="module"',
    );
  },
});

export default defineConfig({
  plugins: [react(), cfAsyncPlugin()],
});
