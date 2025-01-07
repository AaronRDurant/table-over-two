import { getGhostPosts } from "@/api/ghost";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";

/**
 * Groups posts by year.
 *
 * @param posts - Array of posts to group.
 * @returns An object where the keys are years and the values are arrays of posts from that year.
 */
function groupPostsByYear(posts: Post[]): Record<string, Post[]> {
  return posts.reduce((acc: Record<string, Post[]>, post: Post) => {
    const year = new Date(post.published_at).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});
}

/**
 * Archive Page
 * Displays all posts grouped by year.
 */
export default async function ArchivePage() {
  let posts: Post[] = [];

  try {
    // Fetch all posts
    posts = await getGhostPosts(100);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  // Group posts by year
  const groupedPosts = groupPostsByYear(posts);

  return (
    <div className="flex justify-center min-h-screen bg-background text-foreground">
      <main className="max-w-3xl w-full px-8 pb-6">
        <h1 className="text-2xl font-bold mb-6">Archive</h1>
        {Object.keys(groupedPosts)
          .sort((a, b) => Number(b) - Number(a)) // Sort years descending
          .map((year) => (
            <section key={year} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{year}</h2>
              <ul className="space-y-4">
                {groupedPosts[year].map((post: Post) => (
                  <li key={post.id} className="flex items-start gap-4">
                    {post.feature_image && (
                      <Image
                        src={post.feature_image}
                        alt={
                          post.feature_image_alt ||
                          `Thumbnail for ${post.title}`
                        }
                        width={100}
                        height={60}
                        className="rounded object-cover"
                      />
                    )}
                    <div>
                      <p className="text-sm text-gray-500">
                        {new Date(post.published_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <h3 className="text-lg font-semibold">
                        <Link
                          href={`/${post.slug}`}
                          className="hover:underline"
                        >
                          {post.title}
                        </Link>
                      </h3>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
      </main>
    </div>
  );
}
