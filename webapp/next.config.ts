import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Website",
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
  trailingSlash: true,
};

export default nextConfig;
