import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getGhostPosts, getGhostPostBySlug } from "@/api/ghost";

/**
 * Generate metadata dynamically for the article page.
 *
 * @param params - Contains the slug of the article.
 * @returns Metadata object for the page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getGhostPostBySlug(slug);

  if (!post) {
    return {
      title: "404: Article Not Found",
      description: "The article you're looking for doesn't exist.",
    };
  }

  return {
    title: `${post.title} • Table Over Two`,
    description:
      post.excerpt ||
      "Read the latest insights on Supercross and Pro Motocross.",
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      images: [
        {
          url: post.feature_image || "/default-og-image.jpg",
          width: 1200,
          height: 630,
          alt:
            post.feature_image_alt || "Table Over Two motocross article photo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "",
      images: [post.feature_image || "/default-og-image.jpg"],
    },
  };
}

/**
 * Generate static params for dynamic routing.
 *
 * @returns An array of params containing slugs for all articles.
 */
export async function generateStaticParams() {
  const posts = await getGhostPosts(100);
  return posts.map((post) => ({ slug: post.slug }));
}

/**
 * Article Page
 * Displays the content of an individual article fetched from Ghost.
 *
 * @param params - Contains the slug of the article.
 */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>; // Fix: Changed type to Promise
}) {
  const { slug } = await params; // Await the promise to get the slug
  const post = await getGhostPostBySlug(slug);

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">
            404: Article Not Found
          </h1>
          <p className="mt-4 text-base sm:text-lg">
            The article you&#39;re looking for doesn&#39;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-background text-foreground min-h-screen">
      <main className="max-w-3xl w-full px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-12">
        {/* Article Header */}
        <header className="mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-[2.25rem] font-bold leading-tight">
            {post.title}
          </h1>

          {/* Author and Date */}
          <div className="flex items-center gap-3 mt-4">
            {post.primary_author?.profile_image && (
              <Image
                src={post.primary_author.profile_image}
                alt={post.primary_author.name || "Author"}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <p className="text-sm sm:text-base font-semibold">
                {post.primary_author?.name}
              </p>
              <p className="text-sm text-secondary">
                {new Date(post.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Feature Image */}
          {post.feature_image && (
            <div className="mt-4 sm:mt-6">
              <Image
                src={post.feature_image}
                alt={post.feature_image_alt || `Image for ${post.title}`}
                width={1200}
                height={741}
                className="w-full h-auto rounded"
              />
              {post.feature_image_caption && (
                <p
                  className="feature-image-caption"
                  dangerouslySetInnerHTML={{
                    __html: post.feature_image_caption,
                  }}
                />
              )}
            </div>
          )}
        </header>

        {/* Article Content */}
        <article
          className="prose prose-base sm:prose-lg max-w-none text-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.html || "" }}
        />

        {/* Tags Section */}
        {post.tags && post.tags.length > 0 && (
          <footer className="mt-8">
            <h2 className="sr-only">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {post.tags
                .sort((a, b) => a.name.localeCompare(b.name)) // Alphabetical order
                .map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/topics/${tag.slug}`} // Link to the corresponding tag page
                    className="tag-button px-3 py-1 text-sm font-medium rounded border transition-colors duration-200 hover:no-underline"
                    aria-label={`View all posts tagged with ${tag.name}`}
                  >
                    {tag.name}
                  </Link>
                ))}
            </div>
          </footer>
        )}
      </main>
    </div>
  );
}
