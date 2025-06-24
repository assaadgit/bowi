/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' because API routes require server environment
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;