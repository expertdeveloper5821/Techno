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
  // Image optimization for production
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 10, // 10 minutes cache
  },
};

export default nextConfig;