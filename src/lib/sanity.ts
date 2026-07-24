import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

function getEnvVar(key: string, defaultValue: string = ''): string {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] || defaultValue;
  }
  return defaultValue;
}

export const sanityClient = createClient({
  projectId: getEnvVar('PUBLIC_SANITY_PROJECT_ID', 'k4vpp9e5'),
  dataset: getEnvVar('PUBLIC_SANITY_DATASET', 'production'),
  useCdn: getEnvVar('SANITY_USE_CDN', 'true') === 'true',
  apiVersion: '2024-01-01',
});

const originalFetch = sanityClient.fetch.bind(sanityClient);
sanityClient.fetch = async (query: string, params?: any, options?: any) => {
  try {
    const result = await Promise.race([
      originalFetch(query, params, options),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Sanity fetch timeout')), 10000))
    ]);
    return result;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    throw error;
  }
};

const builder = imageUrlBuilder(sanityClient);

/**
 * Helper function to resolve Sanity Image URLs
 */
export function urlFor(source: any) {
  return builder.image(source);
}
