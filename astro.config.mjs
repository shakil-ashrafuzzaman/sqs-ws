// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import react from '@astrojs/react';

import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  // Site domain for canonical URLs and sitemap
  site: 'https://sqssecurity.co.uk',

  // Static output (default in Astro 5).
  // Individual API routes opt-in to SSR with: export const prerender = false;
  output: 'static',
  
  // Required adapter for SSR routes on Node daemon (cPanel)
  adapter: node({
    mode: 'standalone',
  }),

  // Vite plugins — Tailwind CSS 4 is a Vite-native plugin
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sanity({
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'k4vpp9e5',
      dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
      useCdn: false,
      studioBasePath: '/admin',
    }),
    // Auto-generates /sitemap-index.xml and /sitemap-0.xml at build time
    sitemap({
      // Exclude API routes and admin paths from sitemap
      filter: (page) =>
        !page.includes('/api/') && !page.includes('/studio/') && !page.includes('/admin/'),
    }),
  ],

  // Image service for optimized asset delivery
  image: {
    // Domains allowed for remote image optimization (Sanity CDN)
    domains: ['cdn.sanity.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
    ],
  },

  // Markdown configuration
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      langs: [],
    },
  },
});
