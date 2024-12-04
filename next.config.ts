import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    styledComponents: true,
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      };
    }
    config.optimization.splitChunks = {
      chunks: "all",
      maxSize: 200000,
      minSize: 30000,
    };

    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
  eslint: {
    dirs: ["src"],
  },
  poweredByHeader: false,
  trailingSlash: true,
  generateEtags: false,
  modularizeImports: {
    lodash: {
      transform: "lodash/{{member}}",
    },
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
