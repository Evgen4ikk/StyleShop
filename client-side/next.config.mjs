/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nikitaefremov.ru'
      }
    ]
  }
}

export default nextConfig
