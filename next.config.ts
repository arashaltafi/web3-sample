import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = {
      layers: true, // Enable the layers experiment
      asyncWebAssembly: true, // Enable asynchronous WebAssembly support
    };
    return config;
  },
};

export default nextConfig;
