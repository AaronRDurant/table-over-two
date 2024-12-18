export async function fetchGhostPosts(limit: number = 5) {
  const url = `http://localhost:2368/ghost/api/content/posts/?key=b30648b0fe1cad4980ba726b12&limit=${limit}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error("Error fetching Ghost posts:", error);
    return [];
  }
}
