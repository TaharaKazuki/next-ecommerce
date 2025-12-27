import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
