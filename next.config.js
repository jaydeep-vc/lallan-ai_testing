/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [82, 110, 140, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  experimental: {
    serverActions: true,
  },
  // react pdf
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;
