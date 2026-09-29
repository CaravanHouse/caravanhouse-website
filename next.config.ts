import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // Язык по умолчанию — русский.
      { source: "/", destination: "/ru", permanent: false },
    ];
  },
};

export default nextConfig;
