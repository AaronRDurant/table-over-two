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
    <div className="flex justify-center bg-background text-foreground min-h-screen">
      <main className="max-w-3xl w-full px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-12">
        {/* Page Title */}
        <header className="mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-[2.25rem] font-bold leading-tight">
            Archive
          </h1>
        </header>

        {/* Grouped Posts by Year */}
        {Object.keys(groupedPosts)
          .sort((a, b) => Number(b) - Number(a)) // Sort years descending
          .map((year) => (
            <section key={year} className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">{year}</h2>
              <ul className="space-y-6">
                {groupedPosts[year].map((post: Post) => (
                  <li
                    key={post.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                  >
                    {post.feature_image && (
                      <div className="hidden sm:block">
                        <Image
                          src={post.feature_image}
                          alt={
                            post.feature_image_alt ||
                            `Thumbnail for ${post.title}`
                          }
                          width={120}
                          height={72}
                          className="rounded object-cover"
                        />
                      </div>
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
                      <h3 className="text-lg sm:text-xl font-semibold">
                        <Link
                          href={`/${post.slug}`}
                          className="hover:underline block break-words"
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
