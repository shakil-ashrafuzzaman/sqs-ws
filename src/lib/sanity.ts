import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'k4vpp9e5',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  useCdn: true, // Use CDN to prevent network hanging in this environment
  apiVersion: '2024-01-01',
});

const originalFetch = sanityClient.fetch.bind(sanityClient);
sanityClient.fetch = async (query: string, params?: any, options?: any) => {
  try {
    const result = await Promise.race([
      originalFetch(query, params, options),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Sanity fetch timeout')), 1500))
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
