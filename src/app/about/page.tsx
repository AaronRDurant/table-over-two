import { Metadata } from "next";
import { getGhostPageBySlug } from "@/api/ghost";

/**
 * Dynamically generate metadata for the About page from Ghost.
 */
export async function generateMetadata(): Promise<Metadata> {
  const fallbackDescription = "Learn more about Table Over Two."; // Unified fallback
  const aboutPage = await getGhostPageBySlug("about");

  if (!aboutPage) {
    return {
      title: "About Table Over Two",
      description: fallbackDescription,
    };
  }

  return {
    title: aboutPage.title, // Exact title from Ghost
    description: aboutPage.excerpt || fallbackDescription, // Unified fallback
  };
}

/**
 * About Page
 * Dynamically fetches the content of the About page from Ghost.
 */
export default async function AboutPage() {
  const aboutPage = await getGhostPageBySlug("about");

  if (!aboutPage) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">Page Not Found</h1>
          <p className="mt-4 text-base sm:text-lg">
            The About page is currently unavailable. Please check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-background text-foreground min-h-screen">
      <main className="max-w-3xl w-full px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-12">
        {/* Page Title */}
        <header className="mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-[2.25rem] font-bold leading-tight">
            {aboutPage.title}
          </h1>
        </header>

        {/* Page Content */}
        <section
          className="prose prose-base sm:prose-lg max-w-none text-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: aboutPage.html || "" }}
        />
      </main>
    </div>
  );
}
