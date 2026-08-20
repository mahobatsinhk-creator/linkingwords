import "server-only";

import {
  isEmptyCollection,
  unwrapOrNull,
  wpFetch,
} from "@/lib/wp/client";
import type { WPCollectionParams, WPService } from "@/types/wordpress";

/** REST base: /wp-json/wp/v2/service */
const ENDPOINT = "service";
const TAG = "wordpress:services";

export async function getServices(
  params: WPCollectionParams = {},
): Promise<WPService[]> {
  const result = await wpFetch<WPService[]>(
    ENDPOINT,
    { perPage: 50, embed: true, order: "asc", orderBy: "menu_order", ...params },
    { tags: [TAG] },
  );

  const data = unwrapOrNull(result);
  if (!data || isEmptyCollection(data)) return [];
  return data;
}

export async function getServiceBySlug(
  slug: string,
): Promise<WPService | null> {
  if (!slug) return null;

  const result = await wpFetch<WPService[]>(
    ENDPOINT,
    { slug, perPage: 1, embed: true },
    { tags: [TAG, `wordpress:service:${slug}`] },
  );

  const data = unwrapOrNull(result);
  if (!data || isEmptyCollection(data)) return null;
  return data[0] ?? null;
}

/** @deprecated Prefer getServiceBySlug */
export const getService = getServiceBySlug;
