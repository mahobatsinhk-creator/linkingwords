import "server-only";

import {
  isEmptyCollection,
  unwrapOrNull,
  wpFetch,
} from "@/lib/wp/client";
import type { WPCollectionParams, WPPost } from "@/types/wordpress";

const ENDPOINT = "posts";
const TAG = "wordpress:posts";

export async function getPosts(
  params: WPCollectionParams = {},
): Promise<WPPost[]> {
  const result = await wpFetch<WPPost[]>(
    ENDPOINT,
    { perPage: 10, embed: true, order: "desc", orderBy: "date", ...params },
    { tags: [TAG] },
  );

  const data = unwrapOrNull(result);
  if (!data || isEmptyCollection(data)) return [];
  return data;
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  if (!slug) return null;

  const result = await wpFetch<WPPost[]>(
    ENDPOINT,
    { slug, perPage: 1, embed: true },
    { tags: [TAG, `wordpress:post:${slug}`] },
  );

  const data = unwrapOrNull(result);
  if (!data || isEmptyCollection(data)) return null;
  return data[0] ?? null;
}

/** @deprecated Prefer getPostBySlug */
export const getPost = getPostBySlug;

export async function getPostById(id: number): Promise<WPPost | null> {
  if (!Number.isFinite(id) || id <= 0) return null;

  const result = await wpFetch<WPPost>(
    `${ENDPOINT}/${id}`,
    { embed: true },
    { tags: [TAG, `wordpress:post-id:${id}`] },
  );

  return unwrapOrNull(result);
}
