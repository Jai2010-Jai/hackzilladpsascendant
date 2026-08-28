import path from "node:path";
import { fileURLToPath } from "node:url";

const pythonOrigin = process.env.PYTHON_ORIGIN || "http://127.0.0.1:8000";
const webRoot = path.dirname(fileURLToPath(import.meta.url));
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: webRoot,
  ...(isPages
    ? {
        output: "export",
        basePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

if (!isPages) {
  nextConfig.rewrites = async () => [
    { source: "/api/:path*", destination: `${pythonOrigin}/api/:path*` },
    { source: "/auth/:path*", destination: `${pythonOrigin}/auth/:path*` },
    { source: "/health", destination: `${pythonOrigin}/health` },
  ];
}

export default nextConfig;
