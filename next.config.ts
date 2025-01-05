import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      process.env.GHOST_API_URL
        ? new URL(process.env.GHOST_API_URL).hostname
        : "", // Dynamically allow Ghost domain if defined
      "www.gravatar.com", // Allow Gravatar for author profile images
    ].filter(Boolean), // Filter out any empty strings to avoid potential issues
  },
};

export default nextConfig;
