import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/psychic-fortnight',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
