/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  env: {
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
  },
}

module.exports = nextConfig
