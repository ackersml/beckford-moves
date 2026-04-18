/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // Apex (beckfordmoves.com) → www so shared links and Instagram resolve
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'host', value: 'beckfordmoves.com' }],
        destination: 'https://www.beckfordmoves.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig



