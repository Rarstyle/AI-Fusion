import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Increase body size for Server Actions / route handlers to allow video uploads.
  serverActions: {
    bodySizeLimit: "200mb",
  },
};

export default nextConfig;
