import { notFound } from "next/navigation";

import { PagePlaceholder } from "@/components/content/PagePlaceholder";
import { buildMetadata } from "@/lib/seo/metadata";

type WorkSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: WorkSlugPageProps) {
  const { slug } = await params;
  return buildMetadata({
    title: `Work — ${slug}`,
    path: `/work/${slug}`,
  });
}

/**
 * Case study detail shell — data wiring in Case Studies phase.
 * generateStaticParams will be added once WP content exists.
 */
export default async function WorkSlugPage({ params }: WorkSlugPageProps) {
  const { slug } = await params;

  if (!slug) notFound();

  return (
    <PagePlaceholder
      title={slug.replace(/-/g, " ")}
      description="Case study detail route scaffold. Content renders from getCaseStudyBySlug() in a later phase."
    />
  );
}
