import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [new URL(process.env.GHOST_API_URL!).hostname], // Dynamically allow Ghost domain
  },
};

export default nextConfig;
