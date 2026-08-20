import type { Metadata } from "next";

import { getSiteUrl } from "@/lib/utils/env";

const SITE_NAME = "LinkingWordz";
const DEFAULT_DESCRIPTION =
  "Premium editorial brand storytelling for authors and businesses.";

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image,
  noIndex = false,
}: BuildMetadataInput = {}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const ogImage = image ? absoluteUrl(image) : undefined;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                alt: title ?? SITE_NAME,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: fullTitle,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const siteConfig = {
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  url: getSiteUrl(),
} as const;
