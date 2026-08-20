/**
 * Environment helpers.
 * WP REST base is public-read per architecture Section P.
 */

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!url) {
    return "http://localhost:3000";
  }
  return url;
}

/**
 * WordPress REST v2 base, e.g. https://cms.linkingwordz.com/wp-json/wp/v2
 * Prefer NEXT_PUBLIC_WP_API_URL (architecture). WORDPRESS_API_URL kept as alias.
 */
export function getWordPressApiUrl(): string | null {
  const url = (
    process.env.NEXT_PUBLIC_WP_API_URL || process.env.WORDPRESS_API_URL
  )?.replace(/\/$/, "");
  return url || null;
}

/** Derive https://host/wp-json from a .../wp/v2 base URL. */
export function getWordPressJsonRoot(): string | null {
  const api = getWordPressApiUrl();
  if (!api) return null;
  return api.replace(/\/wp\/v2\/?$/, "");
}

export function isWordPressConfigured(): boolean {
  return Boolean(getWordPressApiUrl());
}
