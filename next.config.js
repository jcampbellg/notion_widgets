/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    notionSecret: process.env.NOTION_SECRET
  }
}

module.exports = nextConfig
