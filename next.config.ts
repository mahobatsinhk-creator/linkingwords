import type { NextConfig } from "next";

/**
 * Remote image hosts for next/image.
 * Prefer WORDPRESS_IMAGE_HOSTNAME; fall back to NEXT_PUBLIC_WP_API_URL.
 */
function wordpressImageHostname(): string | undefined {
  const explicit = process.env.WORDPRESS_IMAGE_HOSTNAME?.trim();
  if (explicit) return explicit;

  const apiUrl =
    process.env.NEXT_PUBLIC_WP_API_URL || process.env.WORDPRESS_API_URL;
  if (!apiUrl) return undefined;

  try {
    return new URL(apiUrl).hostname;
  } catch {
    return undefined;
  }
}

const imageHostname = wordpressImageHostname();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: imageHostname
      ? [
          {
            protocol: "https",
            hostname: imageHostname,
          },
          {
            protocol: "http",
            hostname: imageHostname,
          },
        ]
      : [],
  },
  async redirects() {
    return [
      {
        source: "/services-authors",
        destination: "/services/authors",
        permanent: true,
      },
      {
        source: "/services-brands",
        destination: "/services/brands",
        permanent: true,
      },
      {
        source: "/testimonial",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/copy-of-authors-1",
        destination: "/services/authors",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/insights/:slug",
        permanent: true,
      },
      {
        source: "/authors",
        destination: "/services/authors",
        permanent: true,
      },
      {
        source: "/businesses",
        destination: "/services/brands",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
