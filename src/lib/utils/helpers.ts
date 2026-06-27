/**
 * Shared utility functions for SQS Security website
 */

/**
 * Format a date string into UK-style long format
 * e.g. "21 June 2026"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Calculate estimated reading time in minutes
 * Assumes 200 words per minute average reading speed
 */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

/**
 * Generate a canonical URL for a given path
 */
export function canonicalUrl(path: string): string {
  const base = 'https://sqssecurity.co.uk';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

/**
 * Truncate text to a given character limit with ellipsis
 */
export function truncate(text: string, limit = 160): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit).trimEnd() + '…';
}

/**
 * Generate the URL for a service area page
 * e.g., "Southampton" -> "/security-company-southampton"
 */
export function serviceAreaUrl(locationName: string): string {
  const slug = locationName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  return `/security-company-${slug}`;
}

/**
 * Clamp a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Generate star rating display string
 * e.g., 5 -> "★★★★★"
 */
export function starRating(rating: number): string {
  const filled = '★'.repeat(clamp(rating, 0, 5));
  const empty = '☆'.repeat(5 - clamp(rating, 0, 5));
  return filled + empty;
}

/**
 * Get initials from a full name
 * e.g., "John Smith" -> "JS"
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
