import { Metadata } from "next";
import Image from "next/image";

import { getGhostPosts, getGhostPostBySlug } from "@/api/ghost";

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

export async function generateStaticParams() {
  const posts = await getGhostPosts(100);
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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
              <p className="text-sm text-gray-500">
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
                height={720}
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

        {/* Article Content */}
        <article
          className="prose prose-base sm:prose-lg max-w-none text-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.html || "" }}
        />
      </main>
    </div>
  );
}
