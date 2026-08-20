import { PagePlaceholder } from "@/components/content/PagePlaceholder";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Insights",
  path: "/insights",
});

export default function InsightsPage() {
  return <PagePlaceholder title="Insights" />;
}
