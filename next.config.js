/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output configuration
  output: 'standalone',
  // Image optimization
  images: {
    domains: ['xqpebkwqvxxfgqfgdfai.supabase.co'],
  },
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Custom webpack configuration
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  // Experimental features
  experimental: {
    // Remove deprecated options
    serverActions: true,
  },
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
  // React strict mode
  reactStrictMode: true,
  // SWC minification
  swcMinify: true,
};

module.exports = nextConfig;
