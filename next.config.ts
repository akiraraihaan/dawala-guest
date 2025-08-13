import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'iroaauayoqlfsetgtlec.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/gastronomi/**',
      },
    ],
  },
};

export default nextConfig;
