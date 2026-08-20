import "server-only";

import {
  isEmptyCollection,
  unwrapOrNull,
  wpFetch,
} from "@/lib/wp/client";
import type { WPCollectionParams, WPPage } from "@/types/wordpress";

const ENDPOINT = "pages";
const TAG = "wordpress:pages";

export async function getPages(
  params: WPCollectionParams = {},
): Promise<WPPage[]> {
  const result = await wpFetch<WPPage[]>(
    ENDPOINT,
    { perPage: 100, embed: true, ...params },
    { tags: [TAG] },
  );

  const data = unwrapOrNull(result);
  if (!data || isEmptyCollection(data)) return [];
  return data;
}

export async function getPage(slug: string): Promise<WPPage | null> {
  if (!slug) return null;

  const result = await wpFetch<WPPage[]>(
    ENDPOINT,
    { slug, perPage: 1, embed: true },
    { tags: [TAG, `wordpress:page:${slug}`] },
  );

  const data = unwrapOrNull(result);
  if (!data || isEmptyCollection(data)) return null;
  return data[0] ?? null;
}

export async function getPageById(id: number): Promise<WPPage | null> {
  if (!Number.isFinite(id) || id <= 0) return null;

  const result = await wpFetch<WPPage>(
    `${ENDPOINT}/${id}`,
    { embed: true },
    { tags: [TAG, `wordpress:page-id:${id}`] },
  );

  return unwrapOrNull(result);
}
