/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: false,
  },
  // Configure for AWS Amplify deployment
  output: 'standalone',
  images: {
    domains: ['localhost'],
  },
}

export default nextConfig