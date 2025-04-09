/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    // Add your environment variables here
  },
  experimental: {
    // Add experimental features here
  },
};

module.exports = nextConfig;