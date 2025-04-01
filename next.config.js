/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  basePath: '/enginuity',
  assetPrefix: '/enginuity/',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    return config;
  },
  transpilePackages: ['framer-motion', 'react-icons'],
  trailingSlash: true,
};

module.exports = nextConfig; 