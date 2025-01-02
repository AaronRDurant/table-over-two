import { getGhostPosts } from "@/api/ghost";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";

export default async function Home() {
  let posts: Post[] = [];

  try {
    posts = await getGhostPosts(5);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const styles = {
    article: "border-b border-gray-500 py-8",
    heading: "text-2xl font-semibold mt-2 text-foreground",
    link: "text-link hover:underline mt-2 inline-block",
    empty: "text-gray-500 text-center mt-8",
  };

  return (
    <div className="flex justify-center min-h-screen bg-background text-foreground">
      <main className="max-w-3xl w-full px-4 pb-6">
        <section>
          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.id} className={styles.article}>
                <p className="text-sm text-gray-500">
                  {formatDate(post.published_at)}
                </p>
                <h2 className={styles.heading}>
                  <Link
                    href={`/articles/${post.slug}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                {post.feature_image && (
                  <Image
                    src={post.feature_image}
                    alt={
                      post.feature_image_alt ||
                      `Image for ${post.title}` ||
                      "Supercross/Pro Motocross photo"
                    }
                    width={1400} // Golden ratio width
                    height={865} // Golden ratio height
                    className="w-full h-auto rounded my-4"
                  />
                )}
                <p className="text-lg mt-2">{post.excerpt}</p>
                <Link href={`/articles/${post.slug}`} className={styles.link}>
                  Drop the gate →
                </Link>
              </article>
            ))
          ) : (
            <p className={styles.empty}>
              No articles found. Please check back later.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
