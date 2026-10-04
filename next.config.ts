import type { NextConfig } from "next";

// Версия сборки: на Vercel — коммит, локально — время сборки. Вшивается в страницу и отдаётся /api/version,
// чтобы открытые вкладки узнавали о новой версии сайта (components/UpdateNotifier.tsx).
const buildId = process.env.VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_DEPLOYMENT_ID || `local-${Date.now()}`;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  env: { NEXT_PUBLIC_BUILD_ID: buildId },
  async redirects() {
    return [
      // Язык по умолчанию — русский.
      { source: "/", destination: "/ru", permanent: false },
    ];
  },
};

export default nextConfig;
