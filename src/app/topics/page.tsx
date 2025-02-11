import Image from "next/image";
import Link from "next/link";
import { getGhostTags, getGhostPosts } from "@/api/ghost";
import { Tag, Post } from "@/types";

/**
 * Dynamically generate metadata for the Topics page.
 *
 * @returns Metadata object for the Topics page.
 */
export const generateMetadata = () => ({
  title: "Topics • Table Over Two",
  description: "Discover topics and explore articles on Table Over Two.",
});

/**
 * Topics Page
 * Displays all tags with their description, featured image, and associated articles.
 */
export default async function TopicsPage() {
  const tags: Tag[] = await getGhostTags();
  const posts: Post[] = await getGhostPosts();

  // Group posts by tags
  const postsByTag: Record<string, Post[]> = {};
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      if (!postsByTag[tag.slug]) {
        postsByTag[tag.slug] = [];
      }
      postsByTag[tag.slug].push(post);
    });
  });

  return (
    <div className="flex justify-center bg-background text-foreground min-h-screen">
      <main className="max-w-3xl w-full px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-12">
        {/* Page Title */}
        <header className="mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-[2.25rem] font-bold leading-tight">
            Topics
          </h1>
        </header>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="tag-card p-4 rounded-lg shadow-md flex flex-col"
            >
              {/* Tag Image */}
              {tag.feature_image && (
                <Image
                  src={tag.feature_image}
                  alt={`Table Over Two photo for ${tag.name}`}
                  width={600}
                  height={371}
                  className="w-full object-cover rounded mb-4"
                  priority
                />
              )}

              {/* Tag Name */}
              <h2 className="text-lg sm:text-xl font-semibold mb-2">
                {tag.name}
              </h2>

              {/* Tag Description */}
              {tag.description && (
                <p className="tag-description text-base text-secondary mb-4">
                  {tag.description}
                </p>
              )}

              {/* List of Articles */}
              {postsByTag[tag.slug] && postsByTag[tag.slug].length > 0 ? (
                <ul className="list-disc ml-5 space-y-2">
                  {postsByTag[tag.slug].slice(0, 3).map((post) => (
                    <li key={post.id}>
                      <Link
                        href={`/${post.slug}`}
                        className="text-link hover:underline text-base"
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

              {/* View All Link */}
              <Link
                href={`/topics/${tag.slug}`}
                className="mt-4 text-link font-medium hover:underline self-start"
              >
                View all →
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
