/** @type {import('next').NextConfig} */
// const nextConfig = {
  
// }

// module.exports = nextConfig

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  }
})

module.exports = withBundleAnalyzer()
