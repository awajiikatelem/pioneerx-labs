/**
 * Application environment configuration & base URLs.
 */
export const PRODUCTION_SITE_URL = 'https://pioneerx-labs-3kds.vercel.app';

/**
 * Returns the base URL of the site.
 * Prefers VITE_APP_URL env var, or falls back to production Vercel URL
 * when running locally so shareable links always work externally.
 */
export function getSiteUrl(): string {
  const envUrl = import.meta.env.VITE_APP_URL;
  if (envUrl && envUrl.trim()) {
    return envUrl.trim().replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    // If running on localhost or 127.0.0.1, fallback to production Vercel domain
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return PRODUCTION_SITE_URL;
    }
    return origin;
  }

  return PRODUCTION_SITE_URL;
}
