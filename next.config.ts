import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      process.env.GHOST_API_URL
        ? {
            protocol: "https",
            hostname: new URL(process.env.GHOST_API_URL).hostname,
            port: "",
            pathname: "/**",
          }
        : null,
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        port: "",
        pathname: "/**",
      },
    ].filter(Boolean) as {
      protocol?: "http" | "https";
      hostname: string;
      port?: string;
      pathname?: string;
    }[], // Explicit type for remotePatterns
  },
};

export default nextConfig;
