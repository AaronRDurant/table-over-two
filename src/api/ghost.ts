// Ghost API Configuration
const GHOST_API_URL = process.env.GHOST_API_URL || "";
const GHOST_CONTENT_API_KEY = process.env.GHOST_ADMIN_API_KEY || "";

// Validate API configuration and ensure required environment variables are set
if (!GHOST_API_URL || !GHOST_CONTENT_API_KEY) {
  throw new Error("Missing Ghost API configuration in environment variables.");
}

// -------------------------
// Type Definitions
// -------------------------

/**
 * Type definition for a post fetched from Ghost.
 */
export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  feature_image?: string;
  feature_image_alt?: string;
  feature_image_caption?: string;
  published_at: string;
  html: string;
  primary_author?: {
    name: string;
    profile_image?: string;
  };
  tags?: Tag[];
};

/**
 * Type definition for a tag fetched from Ghost.
 */
export type Tag = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  feature_image?: string;
};

// -------------------------
// Helper Functions
// -------------------------

/**
 * Constructs a URL for the Ghost API.
 *
 * @param endpoint - The API endpoint to call (e.g., "posts").
 * @param params - Query parameters to include in the request.
 * @returns The fully constructed API URL with query parameters.
 */
function buildUrl(
  endpoint: string,
  params: Record<string, string | number>
): string {
  const url = new URL(`${GHOST_API_URL}/ghost/api/content/${endpoint}/`);
  url.searchParams.set("key", GHOST_CONTENT_API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value.toString());
  });
  return url.toString();
}

// -------------------------
// API Fetch Functions
// -------------------------

/**
 * Fetches a list of posts from the Ghost API.
 *
 * @param limit - The maximum number of posts to retrieve (default is 5).
 * @returns A list of posts, or an empty array if the fetch fails.
 */
export async function getGhostPosts(limit: number = 5): Promise<Post[]> {
  const url = buildUrl("posts", { limit, include: "tags,authors" });

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const data = await response.json();
    if (!Array.isArray(data.posts)) {
      throw new Error(
        "Unexpected response structure: 'posts' is not an array."
      );
    }

    return data.posts;
  } catch (error: unknown) {
    console.error(
      "Error fetching posts:",
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

/**
 * Fetches a single post by its slug from the Ghost API.
 *
 * @param slug - The unique identifier (slug) of the post to fetch.
 * @returns The post data, or null if the fetch fails or no post is found.
 */
export async function getGhostPostBySlug(slug: string): Promise<Post | null> {
  const url = buildUrl("posts", {
    filter: `slug:${slug}`,
    include: "tags,authors,primary_author",
  });

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data.posts) && data.posts.length > 0
      ? data.posts[0]
      : null;
  } catch (error: unknown) {
    console.error(
      "Error fetching post by slug:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}

/**
 * Fetches a single page by its slug from the Ghost API.
 *
 * @param slug - The unique identifier (slug) of the page to fetch.
 * @returns The page data, or null if the fetch fails or no page is found.
 */
export async function getGhostPageBySlug(slug: string): Promise<Post | null> {
  const url = buildUrl("pages", { filter: `slug:${slug}`, include: "authors" });

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data.pages) && data.pages.length > 0
      ? data.pages[0]
      : null;
  } catch (error: unknown) {
    console.error(
      "Error fetching page by slug:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}

/**
 * Fetches posts by a specific tag slug from the Ghost API.
 *
 * @param tagSlug - The slug of the tag to filter posts by.
 * @param limit - The maximum number of posts to retrieve (default is 5).
 * @returns A list of posts for the given tag, or an empty array if the fetch fails.
 */
export async function getPostsByTagSlug(
  tagSlug: string,
  limit: number = 5
): Promise<Post[]> {
  const url = buildUrl("posts", {
    filter: `tag:${tagSlug}`,
    limit,
    include: "tags,authors",
  });

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts for tag: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data.posts) ? data.posts : [];
  } catch (error: unknown) {
    console.error(
      `Error fetching posts for tag ${tagSlug}:`,
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

/**
 * Fetches all tags from the Ghost API.
 *
 * @returns A list of tags, or an empty array if the fetch fails.
 */
export async function getGhostTags(): Promise<Tag[]> {
  const url = buildUrl("tags", { include: "count.posts", limit: "all" });

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch tags: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data.tags) ? data.tags : [];
  } catch (error: unknown) {
    console.error(
      "Error fetching tags:",
      error instanceof Error ? error.message : error
    );
    return [];
  }
}
