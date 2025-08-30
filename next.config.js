/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: false,
  },
  images: {
    domains: ['localhost', 'images.unsplash.com', 'via.placeholder.com'],
  },
}

export default nextConfig