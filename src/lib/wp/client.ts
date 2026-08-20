import "server-only";

import { getWordPressApiUrl, getWordPressJsonRoot } from "@/lib/utils/env";
import type {
  WPClientError,
  WPCollectionParams,
  WPFetchResult,
} from "@/types/wordpress";

/** ISR window from architecture Section O */
export const DEFAULT_REVALIDATE_SECONDS = 3600;
const DEFAULT_TIMEOUT_MS = 10_000;

export class WordPressApiError extends Error {
  readonly code: WPClientError["code"];
  readonly status: number;
  readonly endpoint?: string;

  constructor(error: WPClientError, status = 500) {
    super(error.message);
    this.name = "WordPressApiError";
    this.code = error.code;
    this.status = status;
    this.endpoint = error.endpoint;
  }
}

type FetchOptions = {
  revalidate?: number | false;
  tags?: string[];
  timeoutMs?: number;
  /** Absolute URL override (e.g. ACF options outside /wp/v2) */
  absoluteUrl?: string;
};

function buildQuery(params: WPCollectionParams = {}): string {
  const query = new URLSearchParams();

  if (params.page) query.set("page", String(params.page));
  if (params.perPage) query.set("per_page", String(params.perPage));
  if (params.search) query.set("search", params.search);
  if (params.order) query.set("order", params.order);
  if (params.orderBy) query.set("orderby", params.orderBy);
  if (params.embed) query.set("_embed", "true");
  if (params.audience) query.set("audience", params.audience);
  if (params.excludeId) query.set("exclude", String(params.excludeId));
  if (params.category !== undefined) {
    query.set("categories", String(params.category));
  }

  if (params.slug) {
    const slugs = Array.isArray(params.slug) ? params.slug : [params.slug];
    query.set("slug", slugs.join(","));
  }

  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

function parseErrorBody(body: unknown): string | undefined {
  if (!body || typeof body !== "object") return undefined;
  const record = body as Record<string, unknown>;
  if (typeof record.message === "string") return record.message;
  if (typeof record.code === "string") return record.code;
  return undefined;
}

/**
 * Central WordPress REST fetch — all CMS requests go through this.
 */
export async function wpFetch<T>(
  path: string,
  params: WPCollectionParams = {},
  options: FetchOptions = {},
): Promise<WPFetchResult<T>> {
  const base = getWordPressApiUrl();

  if (!base && !options.absoluteUrl) {
    return {
      ok: false,
      status: 500,
      error: {
        code: "NOT_CONFIGURED",
        message:
          "NEXT_PUBLIC_WP_API_URL is not set. Add it to your environment to load CMS content.",
      },
    };
  }

  const endpoint =
    options.absoluteUrl ??
    `${base}/${path.replace(/^\//, "")}${buildQuery(params)}`;

  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
      next: {
        revalidate:
          options.revalidate === undefined
            ? DEFAULT_REVALIDATE_SECONDS
            : options.revalidate,
        tags: options.tags,
      },
    });

    if (response.status === 404) {
      return {
        ok: false,
        status: 404,
        error: {
          code: "NOT_FOUND",
          message: "WordPress resource not found.",
          endpoint,
        },
      };
    }

    if (!response.ok) {
      let message = `WordPress API responded with ${response.status}.`;
      try {
        const body: unknown = await response.json();
        message = parseErrorBody(body) ?? message;
      } catch {
        // ignore JSON parse failures for error bodies
      }

      return {
        ok: false,
        status: response.status,
        error: {
          code: "API_ERROR",
          message,
          endpoint,
        },
      };
    }

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      return {
        ok: false,
        status: 502,
        error: {
          code: "INVALID_RESPONSE",
          message: "WordPress API returned invalid JSON.",
          endpoint,
        },
      };
    }

    const totalHeader = response.headers.get("X-WP-Total");
    const totalPagesHeader = response.headers.get("X-WP-TotalPages");

    return {
      ok: true,
      data: data as T,
      total: totalHeader ? Number(totalHeader) : undefined,
      totalPages: totalPagesHeader ? Number(totalPagesHeader) : undefined,
    };
  } catch (error) {
    const isAbort =
      (error instanceof Error && error.name === "AbortError") ||
      (typeof DOMException !== "undefined" &&
        error instanceof DOMException &&
        error.name === "AbortError");

    if (isAbort) {
      return {
        ok: false,
        status: 504,
        error: {
          code: "TIMEOUT",
          message: `WordPress API request timed out after ${timeoutMs}ms.`,
          endpoint,
        },
      };
    }

    return {
      ok: false,
      status: 502,
      error: {
        code: "NETWORK",
        message:
          error instanceof Error
            ? error.message
            : "Network error talking to WordPress.",
        endpoint,
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}

/** Fetch a URL under the wp-json root (outside /wp/v2), e.g. ACF options. */
export async function wpFetchJsonRoot<T>(
  path: string,
  options: FetchOptions = {},
): Promise<WPFetchResult<T>> {
  const root = getWordPressJsonRoot();
  if (!root) {
    return {
      ok: false,
      status: 500,
      error: {
        code: "NOT_CONFIGURED",
        message: "NEXT_PUBLIC_WP_API_URL is not set.",
      },
    };
  }

  return wpFetch<T>("", {}, {
    ...options,
    absoluteUrl: `${root}/${path.replace(/^\//, "")}`,
  });
}

export function unwrapOrNull<T>(result: WPFetchResult<T>): T | null {
  return result.ok ? result.data : null;
}

export function isEmptyCollection<T>(data: T): boolean {
  return Array.isArray(data) && data.length === 0;
}
