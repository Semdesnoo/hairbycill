import type { NextConfig } from "next";

// No basePath: served from the root of hairbycill.nl (GitHub Pages custom domain, public/CNAME).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
