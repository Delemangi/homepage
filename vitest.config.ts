import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default function config() {
  return defineConfig({
    plugins: [react()],
    test: {
      environment: 'jsdom',
      restoreMocks: true,
      setupFiles: ['./src/test/setup.ts'],
    },
  });
}
