import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default function config() {
  return defineConfig({
    plugins: [react()],
  });
}
