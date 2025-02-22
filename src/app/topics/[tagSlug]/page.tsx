import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getGhostPostBySlug, getGhostPosts, getGhostTags } from "@/api/ghost";
import { Post } from "@/types";

/**
 * Fetches tag photo credits from the "Tag Photo Credits" post in Ghost.
 */
async function getPhotoCredits(): Promise<Record<string, string>> {
  try {
    const creditPost = await getGhostPostBySlug("tag-photo-credits");

    if (!creditPost || !creditPost.html) return {};

    const jsonText = creditPost.html
      .replace(/^<p>/, "")
      .replace(/<\/p>$/, "")
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();

    if (!jsonText.startsWith("{") || !jsonText.endsWith("}")) {
      throw new Error("Invalid JSON structure in Tag Photo Credits post.");
    }

    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error fetching or parsing photo credits JSON:", error);
    return {};
  }
}

/**
 * Dynamically generate metadata for tag pages.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tagSlug: string }>;
}): Promise<Metadata> {
  const { tagSlug } = await params;
  const tags = await getGhostTags();
  const tag = tags.find((t) => t.slug === tagSlug);

  if (!tag) {
    return {
      title: "Tag Not Found",
      description: "The tag you're looking for does not exist.",
    };
  }

  const title = `${tag.name} • Table Over Two`;
  const description =
    tag.description?.trim() || `Explore posts tagged with ${tag.name}.`;
  const defaultFeatureImage =
    "https://www.tableovertwo.com/2025-Detroit-Supercross-Ford-Field-opening-ceremonies.jpg";
  const featureImage = tag.feature_image || defaultFeatureImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.tableovertwo.com/topics/${tagSlug}`,
      images: [{ url: featureImage, width: 1200, height: 630, alt: tag.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [featureImage],
    },
  };
}

/**
 * Tag Page
 * Displays posts associated with a specific tag.
 */
export default async function TagPage({
  params,
}: {
  params: Promise<{ tagSlug: string }>;
}) {
  const { tagSlug } = await params;
  const tags = await getGhostTags();
  const tag = tags.find((t) => t.slug === tagSlug);
  const photoCredits = await getPhotoCredits();

  if (!tag) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">Tag Not Found</h1>
          <p className="mt-4 text-base sm:text-lg">
            The tag you&#39;re looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  const posts = await getGhostPosts(100);
  const filteredPosts = posts.filter((post) =>
    post.tags?.some((t) => t.slug === tagSlug)
  );

  return (
    <div className="flex justify-center bg-background text-foreground min-h-screen">
      <main className="max-w-3xl w-full px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-12">
        {/* Page Header */}
        <header className="mb-6 sm:mb-8 md:mb-10">
          {tag.feature_image && (
            <div>
              <div className="relative w-full aspect-[1.618/1] mb-2">
                <Image
                  src={tag.feature_image}
                  alt={tag.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  priority
                />
              </div>
              <p className="feature-image-caption text-sm text-secondary">
                {photoCredits?.[tagSlug] ?? "Unknown"}
              </p>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-[2.25rem] font-bold leading-tight mt-4">
            {tag.name}
          </h1>

          {/* Tag Description */}
          {tag.description && (
            <p className="mt-4 text-foreground text-sm sm:text-base leading-relaxed">
              {tag.description}
            </p>
          )}
        </header>

        {/* Posts List */}
        <section>
          {filteredPosts.length > 0 ? (
            <ul className="space-y-6">
              {filteredPosts.map((post: Post) => (
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
                    {/* Post Published Date */}
                    <p className="text-sm text-secondary">
                      {new Date(post.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
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
          ) : (
            <p className="text-gray-500 text-center mt-12">
              No posts available for this tag yet.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
