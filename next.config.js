/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  transpilePackages: ['remark', 'remark-gfm', 'remark-html'],
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
