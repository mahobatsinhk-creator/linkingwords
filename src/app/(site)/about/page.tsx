import { PagePlaceholder } from "@/components/content/PagePlaceholder";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "About",
  path: "/about",
});

export default function AboutPage() {
  return <PagePlaceholder title="About" />;
}
