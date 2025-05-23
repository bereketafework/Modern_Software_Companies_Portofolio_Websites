
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'toppng.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.bridgingminds.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.keysight.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cepr.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'blog.fleetx.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd15shllkswkct0.cloudfront.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sii.pl',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.openaccessgovernment.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'threatconnect.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nextgen.group',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'is1-ssl.mzstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ih1.redbubble.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.citypng.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;

