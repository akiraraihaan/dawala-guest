/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'iroaauayoqlfsetgtlec.supabase.co',
        pathname: '/storage/v1/object/public/gastronomi/**',
      },
    ],
  },
};

module.exports = nextConfig;
