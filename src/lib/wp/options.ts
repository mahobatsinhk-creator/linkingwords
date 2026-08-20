import "server-only";

import { unwrapOrNull, wpFetchJsonRoot } from "@/lib/wp/client";
import type { WPOptions } from "@/types/wordpress";

const TAG = "wordpress:options";

/**
 * Global ACF / SCF Options Page.
 * Endpoint: /wp-json/acf/v3/options/options (when SCF REST is enabled).
 * Returns null when WP is unconfigured or the endpoint is unavailable.
 */
export async function getOptions(): Promise<WPOptions | null> {
  const result = await wpFetchJsonRoot<WPOptions>("acf/v3/options/options", {
    tags: [TAG],
  });

  const data = unwrapOrNull(result);
  if (!data || typeof data !== "object") return null;
  return data;
}
