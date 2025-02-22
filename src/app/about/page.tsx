import { Metadata } from "next";
import { getGhostPageBySlug } from "@/api/ghost";

/**
 * Dynamically generate metadata for the About page from Ghost.
 */
export async function generateMetadata(): Promise<Metadata> {
  const title = "About • Table Over Two";
  const description = "On the mindset and strategy behind motocross success.";
  const defaultImage =
    "https://www.tableovertwo.com/2025-Detroit-Supercross-Ford-Field-opening-ceremonies.jpg";

  const aboutPage = await getGhostPageBySlug("about");

  const pageDescription = aboutPage?.excerpt?.trim() || description;
  const pageImage = aboutPage?.feature_image || defaultImage;

  return {
    title,
    description: pageDescription,
    openGraph: {
      title,
      description: pageDescription,
      url: "https://www.tableovertwo.com/about",
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: "About Table Over Two",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: pageDescription,
      images: [pageImage],
    },
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

        {/* Page Content with Styling for Figure and Captions */}
        <section
          className="prose prose-base sm:prose-lg max-w-none text-foreground leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: aboutPage.html
              ? aboutPage.html.replace(
                  /<figcaption>/g,
                  '<figcaption class="kg-card kg-image-card">'
                )
              : "",
          }}
        />
      </main>
    </div>
  );
}
