// next.config.ts

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Add this 'images' block
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;