import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
        tsconfigPath: "./tsconfig.json",
    }
  /* config options here */
};

export default nextConfig;
