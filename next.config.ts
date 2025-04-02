import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  experimental: {
    runtime: 'edge', 
    serverComponentsExternalPackages: ['jsonwebtoken'],
  },
  images: {
    unoptimized: true, 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  
};

export default nextConfig;
