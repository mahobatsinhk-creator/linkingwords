import { PagePlaceholder } from "@/components/content/PagePlaceholder";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Services for Authors",
  path: "/services/authors",
});

export default function ServicesAuthorsPage() {
  return (
    <PagePlaceholder
      title="For Authors & Publishers"
      description="Audience services page scaffold. Full ServiceDetail content arrives in the Services phase."
    />
  );
}
