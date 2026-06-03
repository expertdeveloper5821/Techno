import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https:",
      "frame-ancestors 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Expose server-only env vars to both Edge and Node.js runtimes
  env: {
    SESSION_SECRET: process.env.SESSION_SECRET ?? "fallback-dev-secret",
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  turbopack: {
    // Prevent Turbopack from scanning outside this project.
    root: process.cwd(),
  },
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
    remotePatterns: [
      {
        // Allow any S3 bucket in any region
        // e.g. https://my-bucket.s3.ap-south-1.amazonaws.com/techno/...
        protocol: 'https',
        hostname: '**.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;