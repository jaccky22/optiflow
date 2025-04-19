/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    domains: ['localhost'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['http://localhost:3000']
    },
  },
};

export default nextConfig;
