import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Table Over Two",
  description: "Breaking down motocross success.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased font-sans">
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-lg font-bold">Table Over Two</h1>
        </header>
        <main className="p-4">{children}</main>
        <footer className="bg-gray-800 text-white p-4 mt-4 text-center">
          <p>&copy; 2024 Table Over Two. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
