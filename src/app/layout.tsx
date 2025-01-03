import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme";
import Sidebar from "./sidebar";

export const metadata: Metadata = {
  title: "Table Over Two",
  description: "Breaking down motocross success.",
  openGraph: {
    url: "https://www.tableovertwo.com",
    images: [
      {
        url: "/Jett-Lawrence-2024-Supercross-Honda-CRF450R-race-bike.jpg",
        width: 1200,
        height: 630,
        alt: "Jett Lawrence's 2024 Supercross race bike in the Team Honda HRC hauler",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon and App Icons */}
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
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" sizes="512x512" href="/android-chrome-512x512.png" />
      </head>
      <body className="bg-background text-foreground antialiased font-sans">
        <ThemeProvider>
          <div className="flex justify-center">
            <main className="max-w-3xl py-6 flex-grow">{children}</main>
            <aside className="w-[260px]">
              <Sidebar />
            </aside>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
