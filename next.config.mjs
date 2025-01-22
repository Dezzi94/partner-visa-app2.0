/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Cloudflare compatibility
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  // Configure Edge Runtime
  experimental: {
    runtime: 'experimental-edge',
  }
}

export default nextConfig 