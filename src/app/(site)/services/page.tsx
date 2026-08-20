import { PagePlaceholder } from "@/components/content/PagePlaceholder";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Services",
  path: "/services",
});

export default function ServicesPage() {
  return <PagePlaceholder title="Services" />;
}
