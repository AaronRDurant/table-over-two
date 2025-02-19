import type { Metadata } from "next";
import type { OGImageDescriptor, TwitterImageDescriptor } from "@/types";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme";
import Sidebar from "./sidebar";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tableovertwo.com"),
  title: {
    default: "Table Over Two",
    template: "%s • Table Over Two",
  },
  description:
    "Insights and analysis on Supercross and Pro Motocross for dedicated fans.",
  openGraph: {
    type: "website",
    title: "Table Over Two",
    description:
      "Insights and analysis on Supercross and Pro Motocross for dedicated fans.",
    url: "https://www.tableovertwo.com",
    images: [
      {
        url: "https://www.tableovertwo.com/2025-Detroit-Supercross-Ford-Field-opening-ceremonies.jpg",
        width: 1200,
        height: 630,
        alt: "Jett Lawrence's 2024 Supercross Honda CRF450R race bike",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Table Over Two",
    description:
      "Insights and analysis on Supercross and Pro Motocross for dedicated fans.",
    images: [
      {
        url: "https://www.tableovertwo.com/2025-Detroit-Supercross-Ford-Field-opening-ceremonies.jpg",
        alt: "Jett Lawrence's 2024 Supercross Honda CRF450R race bike",
      },
    ],
  },
};

// Helper functions to extract image descriptors
function getOpenGraphImage(metadata: Metadata): OGImageDescriptor | undefined {
  const images = metadata.openGraph?.images;
  return Array.isArray(images) && typeof images[0] === "object"
    ? (images[0] as OGImageDescriptor)
    : undefined;
}

function getTwitterImage(
  metadata: Metadata
): TwitterImageDescriptor | undefined {
  const images = metadata.twitter?.images;
  return Array.isArray(images) && typeof images[0] === "object"
    ? (images[0] as TwitterImageDescriptor)
    : undefined;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const openGraphImage = getOpenGraphImage(metadata);
  const twitterImage = getTwitterImage(metadata);

  return (
    <html lang="en">
      <head>
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Static Theme Color */}
        <meta name="theme-color" content="#ffffff" />

        {/* Character Encoding */}
        <meta charSet="UTF-8" />

        {/* Viewport for Responsive Design */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* Social Metadata */}
        <meta name="description" content={metadata.description || ""} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={String(metadata.openGraph?.title || "")}
        />
        <meta
          property="og:description"
          content={metadata.openGraph?.description || ""}
        />
        <meta
          property="og:url"
          content={metadata.openGraph?.url?.toString() || ""}
        />
        {openGraphImage && (
          <>
            <meta property="og:image" content={String(openGraphImage.url)} />
            <meta
              property="og:image:alt"
              content={openGraphImage.alt || "Open Graph Image"}
            />
          </>
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={String(metadata.twitter?.title || "")}
        />
        <meta
          name="twitter:description"
          content={metadata.twitter?.description || ""}
        />
        {twitterImage && (
          <>
            <meta name="twitter:image" content={String(twitterImage.url)} />
            <meta
              name="twitter:image:alt"
              content={twitterImage.alt || "Twitter Image"}
            />
          </>
        )}
      </head>
      <body className="antialiased font-sans">
        <ThemeProvider>
          <div className="flex justify-center min-h-screen bg-background text-foreground">
            <main className="max-w-3xl pt-20 sm:pt-8 pb-6 flex-grow border-r-0 sm:border-r border-[var(--accent)]">
              {children}
            </main>
            <aside className="h-full">
              <Sidebar />
            </aside>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
