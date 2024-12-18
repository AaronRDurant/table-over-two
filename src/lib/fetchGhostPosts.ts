import api from "./ghost";

export async function fetchGhostPosts(limit: number = 5) {
  // Ensure the code runs only on the server
  if (typeof window !== "undefined") {
    throw new Error("fetchGhostPosts can only be used on the server.");
  }

  try {
    const posts = await api.posts.browse({ limit });
    return posts;
  } catch (err) {
    console.error("Error fetching posts:", err);
    return [];
  }
}
