/**
 * Global TypeScript declarations for SQS Security
 */

/// <reference types="astro/client" />

// Environment variables type safety
interface ImportMetaEnv {
  // Sanity CMS
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
  readonly PUBLIC_SANITY_API_VERSION: string;
  readonly SANITY_API_TOKEN: string;

  // Resend Email Service
  readonly RESEND_API_KEY: string;
  readonly CONTACT_EMAIL_TO: string;

  // Google Analytics
  readonly PUBLIC_GA4_MEASUREMENT_ID: string;

  // Site
  readonly PUBLIC_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
