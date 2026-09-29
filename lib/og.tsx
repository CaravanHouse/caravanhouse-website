import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { Dictionary } from "@/locales";

export const ogSize = { width: 1200, height: 630 };

// Шрифт лежит в репозитории, чтобы картинка собиралась без сети и с кириллицей.
async function loadFonts() {
  const dir = join(process.cwd(), "assets/fonts");
  const [medium, extraBold] = await Promise.all([
    readFile(join(dir, "Manrope-500.ttf")),
    readFile(join(dir, "Manrope-800.ttf")),
  ]);
  return [
    { name: "Manrope", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Manrope", data: extraBold, weight: 800 as const, style: "normal" as const },
  ];
}

export async function renderOgImage(meta: Dictionary["meta"]) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#070a12",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(246,183,60,0.35), transparent 45%), radial-gradient(circle at 0% 100%, rgba(59,91,219,0.28), transparent 45%)",
          color: "#f3f4f8",
          fontFamily: "Manrope",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 32 32">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#FFD98A" />
                <stop offset="0.55" stopColor="#F6B73C" />
                <stop offset="1" stopColor="#E0891B" />
              </linearGradient>
            </defs>
            <rect width="32" height="32" rx="9" fill="url(#g)" />
            <path d="M7.5 20.5 16 9.5l8.5 11" fill="none" stroke="#1A1204" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.75 24v-3.25a3.25 3.25 0 0 1 6.5 0V24" fill="none" stroke="#1A1204" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>
            <span>Caravan</span>
            <span style={{ color: "#f6b73c" }}>House</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 58, fontWeight: 800, lineHeight: 1.1, letterSpacing: -2 }}>
          <span>{meta.ogTagline}</span>
          <span style={{ color: "#f6b73c" }}>{meta.ogTaglineAccent}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28, fontWeight: 500, color: "#a4abbd" }}>
          <span>{meta.ogFooter}</span>
          <span
            style={{
              display: "flex",
              padding: "12px 26px",
              borderRadius: 999,
              border: "2px solid rgba(246,183,60,0.5)",
              color: "#ffd27a",
            }}
          >
            caravanhouse.uz
          </span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() },
  );
}
