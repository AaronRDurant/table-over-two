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
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-lg font-bold">Table Over Two</h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="/" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:underline">
                    About
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="p-4">{children}</main>
        <footer className="bg-gray-800 text-white p-4 mt-4 text-center">
          <p>&copy; 2024 Table Over Two. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
