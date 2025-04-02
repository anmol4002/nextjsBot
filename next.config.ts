import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 runtime: 'edge',
  experimental: {
     
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
