import type { NextConfig } from "next";

// basePath must match src/lib/basePath.ts (kept separate: next.config can't import from src reliably pre-build)
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/hairbycill",
};

export default nextConfig;
