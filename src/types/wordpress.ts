/**
 * WordPress REST + ACF content types — approved architecture Sections B–E.
 */

export type WPRenderedField = {
  rendered: string;
  protected?: boolean;
};

export type WPMediaSize = {
  file?: string;
  width: number;
  height: number;
  mime_type?: string;
  source_url: string;
};

export type WPFeaturedMedia = {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width?: number;
    height?: number;
    sizes?: Record<string, WPMediaSize>;
  };
};

export type AudienceTerm = "authors" | "brands";

export type WPBaseEntity = {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WPRenderedField;
  content: WPRenderedField;
  excerpt: WPRenderedField;
  author: number;
  featured_media: number;
  template: string;
  /** ACF / SCF fields when Show in REST API is enabled */
  acf?: Record<string, unknown>;
  _embedded?: {
    "wp:featuredmedia"?: WPFeaturedMedia[];
    author?: Array<{ id: number; name: string; slug: string }>;
  };
};

export type WPPage = WPBaseEntity & {
  type: "page";
  parent: number;
  menu_order: number;
};

export type WPPost = WPBaseEntity & {
  type: "post";
  categories: number[];
  tags: number[];
  format: string;
  sticky: boolean;
};

/** CPT slug: service · REST: /wp/v2/service */
export type WPService = WPBaseEntity & {
  type: "service";
  audience?: number[];
  menu_order?: number;
};

/** CPT slug: case_study · REST: /wp/v2/case_study */
export type WPCaseStudy = WPBaseEntity & {
  type: "case_study";
  audience?: number[];
};

/** CPT slug: testimonial · REST: /wp/v2/testimonial */
export type WPTestimonial = WPBaseEntity & {
  type: "testimonial";
};

/** ACF Options Page — shape grows as fields are confirmed in WP */
export type WPOptions = {
  site_logo_light?: unknown;
  site_logo_dark?: unknown;
  contact_email?: string;
  calendly_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  default_cta_text?: string;
  footer_brand_statement?: string;
  [key: string]: unknown;
};

export type WPCollectionParams = {
  page?: number;
  perPage?: number;
  search?: string;
  slug?: string | string[];
  embed?: boolean;
  order?: "asc" | "desc";
  orderBy?: string;
  /** Filter by audience taxonomy term slug when supported */
  audience?: AudienceTerm;
  excludeId?: number;
  category?: number | string;
};

export type WPFetchResult<T> =
  | { ok: true; data: T; total?: number; totalPages?: number }
  | { ok: false; error: WPClientError; status: number };

export type WPClientErrorCode =
  | "NOT_CONFIGURED"
  | "NOT_FOUND"
  | "INVALID_RESPONSE"
  | "TIMEOUT"
  | "NETWORK"
  | "API_ERROR"
  | "EMPTY";

export type WPClientError = {
  code: WPClientErrorCode;
  message: string;
  endpoint?: string;
};
