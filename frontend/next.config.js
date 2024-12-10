/** @type {import('next').NextConfig} */
const nextConfig = 
{images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'i.ytimg.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'i9.ytimg.com',
            pathname: '**',
          },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
