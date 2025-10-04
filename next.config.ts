import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint pendant le build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore les erreurs TypeScript pendant le build
  },
  // Ajoute d'autres options si nécessaire
};

export default nextConfig;