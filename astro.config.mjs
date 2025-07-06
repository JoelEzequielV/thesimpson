import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  adapter: netlify(),
  // Si usas SSR, puedes agregar esto:
  // output: 'server'
});
