import { getGhostPosts } from "@/api/ghost";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";

/**
 * The homepage of the website, displaying the latest articles fetched from the Ghost API.
 *
 * @returns The JSX markup for the homepage, including a list of articles or a fallback message if no articles are found.
 */
export default async function Home() {
  let posts: Post[] = [];

  try {
    // Fetch the latest 5 posts from the Ghost API
    const result = await getGhostPosts(5);
    posts = result || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  /**
   * Formats a date string into a human-readable format.
   *
   * @param dateString - The date string to format.
   * @returns A formatted date string (e.g., "January 1, 2025").
   */
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="flex justify-center min-h-screen bg-background text-foreground">
      <main className="max-w-3xl w-full px-8 pb-6">
        <section>
          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.id} className="border-b border-accent py-8">
                {/* Article Publication Date */}
                <p className="text-sm text-gray-500 mb-2">
                  {formatDate(post.published_at)}
                </p>

                {/* Article Title */}
                <h2 className="text-2xl font-semibold mb-4">
                  <Link href={`/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>

                {/* Article Featured Image */}
                {post.feature_image && (
                  <Image
                    src={post.feature_image}
                    alt={post.feature_image_alt || `Image for ${post.title}`}
                    width={1400}
                    height={865}
                    className="w-full h-auto rounded mb-6"
                  />
                )}

                {/* Article Excerpt */}
                <p className="text-lg mb-4">{post.excerpt}</p>

                {/* Read More Link */}
                <Link
                  href={`/${post.slug}`}
                  className="text-link font-medium hover:underline inline-block"
                >
                  Drop the gate →
                </Link>
              </article>
            ))
          ) : (
            // Fallback message when no articles are available
            <p className="text-gray-500 text-center mt-8">
              No articles found. Please check back later.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
