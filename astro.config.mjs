import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import icon from "astro-icon";

export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://brandoncorpas.com/',
  integrations: [
    sitemap(), 
    react(), 
    icon({
      include: {
        mdi: ["whatsapp"],
      },
    })
  ],
  alias: {
    '@components/*': './src/components/*',
    '@pages/*': './src/pages/*',
    '@layouts/*': './src/layouts/*',
    '@styles/*': './src/styles/*',
  },
});