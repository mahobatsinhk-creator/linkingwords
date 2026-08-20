import { notFound } from "next/navigation";

import { PagePlaceholder } from "@/components/content/PagePlaceholder";
import { buildMetadata } from "@/lib/seo/metadata";

type InsightSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: InsightSlugPageProps) {
  const { slug } = await params;
  return buildMetadata({
    title: slug.replace(/-/g, " "),
    path: `/insights/${slug}`,
  });
}

/**
 * Blog post detail shell — data wiring in Blog/Insights phase.
 */
export default async function InsightSlugPage({ params }: InsightSlugPageProps) {
  const { slug } = await params;

  if (!slug) notFound();

  return (
    <PagePlaceholder
      title={slug.replace(/-/g, " ")}
      description="Article detail route scaffold. Content renders from getPostBySlug() in a later phase."
    />
  );
}
