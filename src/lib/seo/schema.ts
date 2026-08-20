/**
 * JSON-LD builders — architecture Section N.
 * Expand per route in later SEO phase; foundation stubs only.
 */

import { getSiteUrl } from "@/lib/utils/env";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LinkingWordz",
    url: getSiteUrl(),
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}
