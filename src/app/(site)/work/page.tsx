import { PagePlaceholder } from "@/components/content/PagePlaceholder";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Work",
  path: "/work",
});

export default function WorkPage() {
  return <PagePlaceholder title="Selected Work" />;
}
