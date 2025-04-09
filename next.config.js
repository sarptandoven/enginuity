/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['randomuser.me']
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Engiunity' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Engiunity/' : '',
  trailingSlash: true,
  env: {
    // Add your environment variables here
  },
  experimental: {
    // Add experimental features here
  },
};

module.exports = nextConfig;