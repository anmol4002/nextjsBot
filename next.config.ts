import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //--
  // output: 'export',
 
  images: {
    unoptimized: true, 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  //--
};

export default nextConfig;
