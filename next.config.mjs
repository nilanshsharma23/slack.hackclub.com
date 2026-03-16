/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloud-r4rrjh2z8-hack-club-bot.vercel.app'
      },
      { protocol: 'https', hostname: 'assets.hackclub.com' }
    ]
  }
}

export default nextConfig
