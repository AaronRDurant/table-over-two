/**
 * Defines the structure of a `Post` object, based on the Ghost API response schema.
 */
export type Post = {
  /** Unique identifier for the post */
  id: string;

  /** URL-friendly identifier for the post */
  slug: string;

  /** The title of the post */
  title: string;

  /** A short excerpt or summary of the post (optional) */
  excerpt?: string;

  /** URL to the featured image for the post (optional) */
  feature_image?: string;

  /** Alternative text for the featured image (optional) */
  feature_image_alt?: string;

  /** Caption for the featured image (optional) */
  feature_image_caption?: string;

  /** Publication date of the post (ISO 8601 string) */
  published_at: string;

  /** The full HTML content of the post */
  html: string;

  /** Information about the primary author of the post (optional) */
  primary_author?: {
    /** Name of the author */
    name: string;

    /** URL to the author's profile image (optional) */
    profile_image?: string;
  };
};
