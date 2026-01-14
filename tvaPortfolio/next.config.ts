import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use Webpack instead of Turbopack to avoid panic errors with React Three Fiber/Three.js
  experimental: {
    // Disable Turbopack for development
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:3000/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;
