/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    react(),
    // https://stackoverflow.com/a/79321113
    checker({
      eslint: {
        lintCommand: 'eslint src --ext .js,.jsx,.ts,.tsx',
        useFlatConfig: true,
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
