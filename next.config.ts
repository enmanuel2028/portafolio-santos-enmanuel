import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // three.js ships untranspiled ESM examples; keep the transpile list explicit.
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["lucide-react", "motion", "@react-three/drei"],
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
