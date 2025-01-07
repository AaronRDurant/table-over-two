// Ghost API Configuration
const GHOST_API_URL = process.env.GHOST_API_URL || "";
const GHOST_CONTENT_API_KEY = process.env.GHOST_ADMIN_API_KEY || "";

// Validate API configuration and ensure required environment variables are set
if (!GHOST_API_URL || !GHOST_CONTENT_API_KEY) {
  throw new Error("Missing Ghost API configuration in environment variables.");
}

// Define the structure of a post based on the Ghost API's response schema
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
  tags?: Array<{
    name: string;
    slug: string;
  }>;
};

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

/**
 * Fetches a list of posts from the Ghost API.
 *
 * @param limit - The maximum number of posts to retrieve (default is 5).
 * @returns A list of posts, or an empty array if the fetch fails.
 */
export async function getGhostPosts(limit: number = 5): Promise<Post[]> {
  const url = buildUrl("posts", {
    limit,
    include: "tags,authors",
  });

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const data = await response.json();

    // Validate the structure of the response
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

    // Validate and return the first matching post, or null if none exist
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
 * Fetches all tags from the Ghost API.
 *
 * @returns A list of tags, or an empty array if the fetch fails.
 */
export async function getGhostTags(): Promise<
  Array<{
    id: string;
    name: string;
    slug: string;
    description?: string;
    feature_image?: string;
  }>
> {
  const url = buildUrl("tags", {
    include: "count.posts",
    limit: "all", // Fetch all available tags
  });

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch tags: ${response.statusText}`);
    }

    const data = await response.json();

    // Validate the structure of the response
    return Array.isArray(data.tags) ? data.tags : [];
  } catch (error: unknown) {
    console.error(
      "Error fetching tags:",
      error instanceof Error ? error.message : error
    );
    return [];
  }
}
