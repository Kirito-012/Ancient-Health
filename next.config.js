/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // Expose REACT_APP_ env vars to both server and client
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    NEXT_PUBLIC_API_URL: process.env.REACT_APP_API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.ancienthealth.in',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  turbopack: {},
}

module.exports = nextConfig
