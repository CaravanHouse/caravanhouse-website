import type { NextConfig } from "next";

// Версия сборки: на Vercel — коммит, локально — время сборки. Вшивается в страницу и отдаётся /api/version,
// чтобы открытые вкладки узнавали о новой версии сайта (components/UpdateNotifier.tsx).
const buildId = process.env.VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_DEPLOYMENT_ID || `local-${Date.now()}`;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  env: { NEXT_PUBLIC_BUILD_ID: buildId },
  // Своя страница 404 (app/global-not-found.tsx): корневой layout лежит в app/[lang]
  experimental: { globalNotFound: true },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // запрет встраивать сайт в чужие страницы (кликджекинг)
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      // Корень сразу отдаёт русскую версию, без переадресации на /ru: на один круг до сервера меньше.
      // canonical у страницы — /ru, поэтому дубля для поисковиков нет.
      beforeFiles: [{ source: "/", destination: "/ru" }],
    };
  },
};

export default nextConfig;
