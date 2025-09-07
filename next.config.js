import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: false,
  },
  images: {
    domains: ['localhost', 'images.unsplash.com', 'via.placeholder.com'],
  },
  outputFileTracingRoot: __dirname,
}

export default nextConfig