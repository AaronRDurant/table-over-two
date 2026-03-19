import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Use class-based dark mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Include page-level components
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Include app directory components
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Include reusable components
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // CSS variable for background
        foreground: "var(--foreground)", // CSS variable for text color
        link: "var(--link)", // CSS variable for link color
      },
      fontFamily: {
        sans: [
          "Inter", // Primary font
          "system-ui",
          "-apple-system",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [typography],
} satisfies Config;
