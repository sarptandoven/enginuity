/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Engiunity' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Engiunity/' : '',
  trailingSlash: true,
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;