import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo/metadata";

const staticRoutes = [
  "/",
  "/about",
  "/services",
  "/services/authors",
  "/services/brands",
  "/work",
  "/insights",
  "/contact",
] as const;

/**
 * Sitemap foundation — CMS-driven work/insights URLs added once WP is live.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
