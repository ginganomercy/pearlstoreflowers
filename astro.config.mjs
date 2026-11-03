import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://pearlstoreflowers.pages.dev',
  output: 'static',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'load',
  },
  build: {
    format: 'directory',
  },
  integrations: [
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});

