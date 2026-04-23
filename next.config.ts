import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows images from any secure external domain
      },
      {
        protocol: 'http',
        hostname: 'localhost', // Allows images during local development
      }
    ],
  },
};

export default nextConfig;