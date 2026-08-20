import { PagePlaceholder } from "@/components/content/PagePlaceholder";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  path: "/contact",
});

export default function ContactPage() {
  return <PagePlaceholder title="Contact" />;
}
