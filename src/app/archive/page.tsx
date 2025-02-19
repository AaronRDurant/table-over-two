import { getGhostPosts } from "@/api/ghost";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types";

/**
 * Groups posts by year.
 *
 * @param posts - Array of posts to group.
 * @returns An object where the keys are years and the values are arrays of posts from that year.
 */
function groupPostsByYear(posts: Post[]): Record<string, Post[]> {
  return posts.reduce((acc, post) => {
    const year = new Date(post.published_at).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<string, Post[]>);
}

/**
 * Dynamically generate metadata for the Archive page.
 */
export const generateMetadata = () => ({
  title: "Archive • Table Over Two",
  description:
    "Explore the archive of Table Over Two's posts, grouped by year.",
});

/**
 * Archive Page
 * Displays all posts grouped by year, with larger images (golden ratio) on desktop and no images on mobile.
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
            <section
              key={year}
              aria-labelledby={`year-${year}`}
              className="mb-8 sm:mb-10"
            >
              {/* Year Heading */}
              <h2
                id={`year-${year}`}
                className="text-xl sm:text-2xl font-semibold mb-4"
              >
                {year}
              </h2>
              <ul className="space-y-6">
                {groupedPosts[year].map((post) => (
                  <li
                    key={post.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
                  >
                    {/* Post Thumbnail (Hidden on Mobile, Shown on Desktop) */}
                    {post.feature_image && (
                      <div className="hidden sm:block w-48 flex-shrink-0">
                        <Image
                          src={post.feature_image}
                          alt={
                            post.feature_image_alt ||
                            `Thumbnail for ${post.title}`
                          }
                          width={240}
                          height={150}
                          className="rounded object-cover w-full h-auto"
                        />
                      </div>
                    )}
                    <div>
                      {/* Post Publication Date */}
                      <p className="text-sm text-secondary">
                        {new Date(post.published_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      {/* Post Title */}
                      <h3 className="text-lg sm:text-xl font-semibold">
                        <Link
                          href={`/${post.slug}`}
                          className="hover:underline block break-words"
                          aria-label={`Read the article: ${post.title}`}
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
