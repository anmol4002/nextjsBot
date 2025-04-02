import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    unoptimized: true, 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  
};

export default nextConfig;
