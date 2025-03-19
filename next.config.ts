import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: "res.cloudinary.com", protocol: "https" }],
  },
};

export default nextConfig;
