import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
import '@testing-library/jest-dom/vitest';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
    },
  }),
);

