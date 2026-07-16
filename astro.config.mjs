// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  // Site domain for canonical URLs and sitemap
  site: 'https://sqssecurity.co.uk',

  // Static Site Generation (SSG) mode for cPanel standard hosting
  output: 'static',

  vite: {
    resolve: {
      alias: [
        { find: /^lodash\/(.*)$/, replacement: 'lodash-es/$1' },
        { find: 'lodash', replacement: 'lodash-es' }
      ]
    },
    plugins: [
      tailwindcss()
    ],
    define: {},
    build: {
      commonjsOptions: {
        include: [/node_modules/]
      }
    },
    optimizeDeps: {
      include: [
        'event-source-polyfill',
        '@sanity/eventsource',
        '@sanity/eventsource/browser',
        '@sanity/client',
        'sanity',
        '@sanity/vision',
        'react',
        'react-dom',
        'react/jsx-runtime',
        'lodash/isObject',
        'lodash/groupBy',
        'lodash/keyBy',
        'lodash/partition',
        'lodash/sortedIndex'
      ]
    }
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
