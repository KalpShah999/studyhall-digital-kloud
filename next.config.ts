import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:3002/api/:path*', // Proxy to Backend
      },
    ];
  },
  
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: '/logo_1.png',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
