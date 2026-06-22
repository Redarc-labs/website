import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://redarclabs.com',
  integrations: [sitemap()],
  adapter: cloudflare(),
  output: 'static', // ponytail: static output — no SSR needed unless you add server routes
});
