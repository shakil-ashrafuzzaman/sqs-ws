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
  useCdn: getEnvVar('SANITY_USE_CDN', 'true') !== 'false',
  apiVersion: '2024-01-01',
});

// In-memory cache for Sanity queries to eliminate redundant API roundtrips and improve TTFB
const queryCache = new Map<string, { data: any; expiresAt: number }>();
const inFlightRequests = new Map<string, Promise<any>>();
const CACHE_TTL_MS = 60 * 1000; // 60 seconds cache TTL

const originalFetch = sanityClient.fetch.bind(sanityClient);
sanityClient.fetch = async (query: string, params?: any, options?: any) => {
  const cacheKey = `${query}_${JSON.stringify(params || {})}`;
  const now = Date.now();

  // 1. Return fresh cached data if available
  const cached = queryCache.get(cacheKey);
  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  // 2. Deduplicate simultaneous in-flight requests (e.g. siteSettings in Header + BaseLayout + page)
  if (inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey);
  }

  const fetchPromise = (async () => {
    try {
      const result = await Promise.race([
        originalFetch(query, params, options),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Sanity fetch timeout')), 10000))
      ]);
      queryCache.set(cacheKey, { data: result, expiresAt: Date.now() + CACHE_TTL_MS });
      return result;
    } catch (error) {
      console.error('Sanity fetch error:', error);
      throw error;
    } finally {
      inFlightRequests.delete(cacheKey);
    }
  })();

  inFlightRequests.set(cacheKey, fetchPromise);
  return fetchPromise;
};

const builder = imageUrlBuilder(sanityClient);

/**
 * Helper function to resolve Sanity Image URLs
 */
export function urlFor(source: any) {
  return builder.image(source);
}
