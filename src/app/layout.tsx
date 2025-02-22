import "./globals.css";
import { ThemeProvider } from "@/providers/theme";
import Sidebar from "./sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
