import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Rule bundle-barrel-imports: transforms lucide-react barrel imports into
    // direct imports at build time — loads only used icons instead of all 1,583
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
