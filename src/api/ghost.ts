import { Post } from "@/types/post";

/**
 * Fetch posts from the Ghost API.
 * @param {number} limit - Number of posts to retrieve.
 * @returns {Promise<Post[]>} - An array of posts or an empty array on failure.
 */
export async function getGhostPosts(limit: number = 5): Promise<Post[]> {
  const apiUrl = process.env.GHOST_API_URL;
  const apiKey = process.env.GHOST_ADMIN_API_KEY;

  if (!apiUrl || !apiKey) {
    console.error(
      "Missing GHOST_API_URL or GHOST_ADMIN_API_KEY in environment variables."
    );
    return [];
  }

  const url = `${apiUrl}/ghost/api/content/posts/?key=${apiKey}&limit=${limit}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching Ghost posts:", error.message);
    } else {
      console.error(
        "Unknown error occurred while fetching Ghost posts:",
        error
      );
    }
    return [];
  }
}
