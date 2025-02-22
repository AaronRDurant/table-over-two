import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getGhostTags, getGhostPosts } from "@/api/ghost";
import { Tag, Post } from "@/types";

/**
 * Groups posts by tag.
 *
 * @param tags - Array of tags.
 * @param posts - Array of posts.
 * @returns An object where keys are tag slugs and values contain tag data and associated posts.
 */
function groupPostsByTag(
  tags: Tag[],
  posts: Post[]
): Record<string, { tag: Tag; posts: Post[] }> {
  return tags.reduce((acc, tag) => {
    const relatedPosts = posts.filter((post) =>
      post.tags?.some((postTag) => postTag.slug === tag.slug)
    );
    acc[tag.slug] = { tag, posts: relatedPosts };
    return acc;
  }, {} as Record<string, { tag: Tag; posts: Post[] }>);
}

/**
 * Dynamically generate metadata for the Topics page.
 */
export const generateMetadata = (): Metadata => {
  const title = "Topics • Table Over Two";
  const description = "Browse topics covered on Table Over Two.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://www.tableovertwo.com/topics",
      images: [
        {
          url: "https://www.tableovertwo.com/2025-Detroit-Supercross-Ford-Field-opening-ceremonies.jpg",
          width: 1200,
          height: 630,
          alt: "Table Over Two topics page",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        "https://www.tableovertwo.com/2025-Detroit-Supercross-Ford-Field-opening-ceremonies.jpg",
      ],
    },
  };
};

/**
 * Topics Page
 * Displays all tags with their article count, hiding images on mobile.
 */
export default async function TopicsPage() {
  let tags: Tag[] = [];
  let posts: Post[] = [];

  try {
    tags = await getGhostTags();
    posts = await getGhostPosts();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // Group posts by tags
  const groupedTags = groupPostsByTag(tags, posts);

  return (
    <div className="flex justify-center bg-background text-foreground min-h-screen">
      <main className="max-w-3xl w-full px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-12">
        {/* Page Title */}
        <header className="mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-[2.25rem] font-bold leading-tight">
            Topics
          </h1>
        </header>

        {/* Topics List */}
        <ul className="space-y-6">
          {Object.values(groupedTags).map(({ tag, posts }) => (
            <li
              key={tag.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              {/* Tag Image (Hidden on Mobile, Shown on Desktop) */}
              {tag.feature_image && (
                <div className="hidden sm:block w-48 flex-shrink-0">
                  <Image
                    src={tag.feature_image}
                    alt={`Table Over Two photo for ${tag.name}`}
                    width={240} // Larger golden ratio image
                    height={150} // Golden ratio height
                    className="rounded object-cover w-full h-auto"
                  />
                </div>
              )}
              <div>
                {/* Article Count */}
                <p className="text-sm text-secondary">
                  {posts.length} {posts.length === 1 ? "article" : "articles"}
                </p>
                {/* Tag Name */}
                <h2 className="text-lg sm:text-xl font-semibold">
                  <Link
                    href={`/topics/${tag.slug}`}
                    className="hover:underline"
                    aria-label={`View all articles in ${tag.name}`}
                  >
                    {tag.name}
                  </Link>
                </h2>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
