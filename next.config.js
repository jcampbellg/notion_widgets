/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    notionSecret: 'secret_gFnxQLqJNc2CGkwI1N2ks0Shgh9KImF7GeTs2C2Gpqe',
    notionDbId: '3f05558d142644a29acb475d47f68494'
  }
}

module.exports = nextConfig
