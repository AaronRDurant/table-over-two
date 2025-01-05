import { Metadata } from "next";
import Image from "next/image";

import { getGhostPosts, getGhostPostBySlug } from "@/api/ghost";

/**
 * Generates metadata for the page, used for SEO and social sharing.
 *
 * @param params - Contains the slug of the post (wrapped in a Promise-like structure).
 * @returns A `Metadata` object with the title, description, and Open Graph details.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params; // Resolve the Promise-like `params`
  const post = await getGhostPostBySlug(slug);

  if (!post) {
    return {
      title: "404: Article Not Found",
      description: "The article you're looking for doesn't exist.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || "",
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      images: [
        {
          url: post.feature_image || "/default-og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.feature_image_alt || "Table Over Two Article",
        },
      ],
    },
  };
}

/**
 * Generates static parameters for the dynamic `[slug]` route.
 * This function allows Next.js to pre-render pages for all posts.
 *
 * @returns An array of parameters, each containing a slug for a post.
 */
export async function generateStaticParams() {
  const posts = await getGhostPosts(100); // Fetch up to 100 posts
  return posts.map((post) => ({ slug: post.slug }));
}

/**
 * Server component for rendering a single article page.
 *
 * @param params - Contains the slug of the post (wrapped in a Promise-like structure).
 * @returns The JSX markup for the article page or a 404 error message if the post is not found.
 */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Resolve the Promise-like `params`
  const post = await getGhostPostBySlug(slug);

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404: Article Not Found</h1>
          <p className="mt-4 text-lg">
            The article you&#39;re looking for doesn&#39;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-background text-foreground">
      <main className="max-w-3xl w-full px-8 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mt-2">{post.title}</h1>
          <div className="flex items-center gap-4 mt-4">
            {post.primary_author?.profile_image && (
              <Image
                src={post.primary_author.profile_image}
                alt={post.primary_author.name || "Author"}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div>
              <p className="text-lg font-semibold">
                {post.primary_author?.name}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(post.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          {post.feature_image && (
            <div className="relative mt-6">
              <Image
                src={post.feature_image}
                alt={post.feature_image_alt || `Image for ${post.title}`}
                width={1400}
                height={865}
                className="w-full h-auto rounded"
              />
              {post.feature_image_caption && (
                <p
                  className="text-sm text-gray-500 mt-2 text-right"
                  dangerouslySetInnerHTML={{
                    __html: post.feature_image_caption,
                  }}
                />
              )}
            </div>
          )}
        </header>
        <article
          className="prose prose-lg max-w-none text-foreground"
          dangerouslySetInnerHTML={{ __html: post.html || "" }}
        />
      </main>
    </div>
  );
}
