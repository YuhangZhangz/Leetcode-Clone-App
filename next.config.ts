/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    'http://192.168.56.1:3000',
    'http://localhost:3000',
  ],
  webpack(config, { dev, isServer }) {
    if (dev && !isServer) {
      config.output.publicPath = '/_next/static/webpack/';
    }
    return config;
  },
};

module.exports = nextConfig;
