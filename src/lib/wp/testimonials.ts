import "server-only";

import {
  isEmptyCollection,
  unwrapOrNull,
  wpFetch,
} from "@/lib/wp/client";
import type { WPCollectionParams, WPTestimonial } from "@/types/wordpress";

/** REST base: /wp-json/wp/v2/testimonial */
const ENDPOINT = "testimonial";
const TAG = "wordpress:testimonials";

export async function getTestimonials(
  params: WPCollectionParams = {},
): Promise<WPTestimonial[]> {
  const result = await wpFetch<WPTestimonial[]>(
    ENDPOINT,
    { perPage: 20, embed: true, order: "desc", orderBy: "date", ...params },
    { tags: [TAG] },
  );

  const data = unwrapOrNull(result);
  if (!data || isEmptyCollection(data)) return [];
  return data;
}

export async function getTestimonialBySlug(
  slug: string,
): Promise<WPTestimonial | null> {
  if (!slug) return null;

  const result = await wpFetch<WPTestimonial[]>(
    ENDPOINT,
    { slug, perPage: 1, embed: true },
    { tags: [TAG, `wordpress:testimonial:${slug}`] },
  );

  const data = unwrapOrNull(result);
  if (!data || isEmptyCollection(data)) return null;
  return data[0] ?? null;
}
