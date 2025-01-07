import { getGhostTags, getGhostPosts } from "@/api/ghost";
import Image from "next/image";
import Link from "next/link";

/**
 * Topics Page
 * Displays all tags with their description, featured image, and associated articles.
 */
export default async function TopicsPage() {
  const tags = await getGhostTags();
  const posts = await getGhostPosts();

  // Group posts by tags
  const postsByTag: Record<string, typeof posts> = {};
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      if (!postsByTag[tag.slug]) {
        postsByTag[tag.slug] = [];
      }
      postsByTag[tag.slug].push(post);
    });
  });

  return (
    <div className="flex justify-center min-h-screen bg-background text-foreground">
      <main className="max-w-4xl w-full px-2 sm:px-4 py-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-4 pl-1">Topics</h1>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="bg-card p-3 rounded-lg shadow-md flex flex-col"
            >
              {/* Tag Image */}
              {tag.feature_image && (
                <Image
                  src={tag.feature_image}
                  alt={`Image for ${tag.name}`}
                  width={400} // Adjust the width as needed
                  height={240} // Adjust the height as needed
                  className="w-full h-[240px] object-cover rounded mb-2"
                />
              )}

              {/* Tag Name */}
              <h2 className="text-lg font-semibold mb-1">{tag.name}</h2>

              {/* Tag Description */}
              {tag.description && (
                <p className="text-sm text-gray-600 mb-2">{tag.description}</p>
              )}

              {/* List of Articles */}
              {postsByTag[tag.slug] && postsByTag[tag.slug].length > 0 ? (
                <ul className="space-y-1">
                  {postsByTag[tag.slug].map((post) => (
                    <li key={post.id}>
                      <Link
                        href={`/${post.slug}`}
                        className="text-link hover:underline"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  No articles available for this topic yet.
                </p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
