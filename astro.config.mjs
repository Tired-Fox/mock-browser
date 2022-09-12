import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: 'https://tired-fox.github.io',
  base: '/mock-browser',
  integrations: [preact()]
});