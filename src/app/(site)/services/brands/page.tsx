import { PagePlaceholder } from "@/components/content/PagePlaceholder";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Services for Brands",
  path: "/services/brands",
});

export default function ServicesBrandsPage() {
  return (
    <PagePlaceholder
      title="For Businesses & Brands"
      description="Audience services page scaffold. Full ServiceDetail content arrives in the Services phase."
    />
  );
}
