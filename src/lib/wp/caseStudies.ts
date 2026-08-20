import "server-only";

import {
  isEmptyCollection,
  unwrapOrNull,
  wpFetch,
} from "@/lib/wp/client";
import type { WPCaseStudy, WPCollectionParams } from "@/types/wordpress";

/** REST base: /wp-json/wp/v2/case_study */
const ENDPOINT = "case_study";
const TAG = "wordpress:case-studies";

export async function getCaseStudies(
  params: WPCollectionParams = {},
): Promise<WPCaseStudy[]> {
  const result = await wpFetch<WPCaseStudy[]>(
    ENDPOINT,
    { perPage: 20, embed: true, order: "desc", orderBy: "date", ...params },
    { tags: [TAG] },
  );

  const data = unwrapOrNull(result);
  if (!data || isEmptyCollection(data)) return [];
  return data;
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<WPCaseStudy | null> {
  if (!slug) return null;

  const result = await wpFetch<WPCaseStudy[]>(
    ENDPOINT,
    { slug, perPage: 1, embed: true },
    { tags: [TAG, `wordpress:case-study:${slug}`] },
  );

  const data = unwrapOrNull(result);
  if (!data || isEmptyCollection(data)) return null;
  return data[0] ?? null;
}

/** @deprecated Prefer getCaseStudyBySlug */
export const getCaseStudy = getCaseStudyBySlug;
