import { fetchGhostPosts } from "@/lib/ghost";

export default async function Home() {
  const posts = await fetchGhostPosts();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Table Over Two</h1>
      <section className="mt-8">
        {posts.map((post) => (
          <article key={post.id} className="mb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.excerpt}</p>
            <a
              href={`/articles/${post.slug}`}
              className="text-blue-500 hover:underline"
            >
              Read more
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
