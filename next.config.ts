import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = {
      layers: true, // Enable the layers experiment
      // Include other experiments if needed
    };
    return config;
  },
};

export default nextConfig;
