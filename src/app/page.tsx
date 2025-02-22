import { Metadata } from "next";
import { getGhostPosts } from "@/api/ghost";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types";

/**
 * Dynamically generate metadata for the Home page.
 */
export const generateMetadata = (): Metadata => {
  const title = "Table Over Two — On motocross mindset and strategy";
  const description = "On the mindset and strategy behind motocross success.";
  const defaultImage =
    "https://www.tableovertwo.com/2025-Detroit-Supercross-Ford-Field-opening-ceremonies.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      siteName: "Table Over Two",
      description,
      url: "https://www.tableovertwo.com",
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: "Table Over Two — Supercross & motocross analysis",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage],
    },
    other: {
      "og:title": title,
    },
  };
};

/**
 * Homepage
 * Displays the latest articles fetched from the Ghost API.
 */
export default async function Home() {
  let posts: Post[] = [];

  try {
    // Fetch the latest 5 posts from the Ghost API
    posts = await getGhostPosts(5);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  /**
   * Formats a date string into a human-readable format.
   *
   * @param dateString - The date string to format.
   * @returns A formatted date string (e.g., "January 1, 2025").
   */
  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="flex justify-center bg-background text-foreground min-h-screen">
      <main className="max-w-3xl w-full px-4 sm:px-6 md:px-8 pb-16">
        {/* Visually Hidden Headings for Accessibility */}
        <h1 className="sr-only">Table Over Two</h1>
        <h2 className="sr-only">Latest Articles</h2>

        {/* Articles Section */}
        <section>
          {posts.length > 0 ? (
            posts.map((post) => (
              <article
                key={post.id}
                className="border-b border-accent py-6 sm:py-8"
              >
                {/* Article Publication Date */}
                <p className="text-sm sm:text-base text-secondary mb-2">
                  {formatDate(post.published_at)}
                </p>

                {/* Article Title */}
                <h2 className="text-xl sm:text-2xl font-semibold leading-snug">
                  <Link
                    href={`/${post.slug}`}
                    className="hover:underline break-words"
                    aria-label={`Read the article ${post.title}`}
                  >
                    {post.title}
                  </Link>
                </h2>

                {/* Article Featured Image */}
                {post.feature_image && (
                  <div className="mt-3 mb-4">
                    <Image
                      src={post.feature_image}
                      alt={
                        post.feature_image_alt || `Thumbnail for ${post.title}`
                      }
                      width={1200}
                      height={741}
                      className="w-full h-auto rounded-lg"
                      priority
                    />
                  </div>
                )}

                {/* Article Excerpt */}
                <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-4 break-words">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <Link
                  href={`/${post.slug}`}
                  className="text-link font-medium hover:underline inline-block"
                  aria-label={`Continue reading: ${post.title}`}
                >
                  Drop the gate →
                </Link>
              </article>
            ))
          ) : (
            // Fallback message when no articles are available
            <p className="text-gray-500 text-center mt-12">
              No articles found. Please check back later.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
