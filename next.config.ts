import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Optimize bundle size
  experimental: {
    optimizePackageImports: ['framer-motion', 'swiper'],
  },
  // Generate source maps for production debugging (optional)
  productionBrowserSourceMaps: false,
};

export default nextConfig;