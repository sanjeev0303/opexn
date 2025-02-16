import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
        // tsconfigPath: "./tsconfig.json",
    },
      eslint: {
        ignoreDuringBuilds: true,
      },
  /* config options here */
};

export default nextConfig;
