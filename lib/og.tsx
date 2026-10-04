import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { Dictionary } from "@/locales";

export const ogSize = { width: 1200, height: 630 };

// Шрифт лежит в репозитории, чтобы картинка собиралась без сети и с кириллицей.
// Знак логотипа как data URL: ImageResponse не умеет загружать картинки с диска сам
async function loadEmblem() {
  const png = await readFile(join(process.cwd(), "public/brand/emblem.png"));
  return `data:image/png;base64,${png.toString("base64")}`;
}

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
  const emblem = await loadEmblem();
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
          backgroundColor: "#090807",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(246,183,60,0.35), transparent 45%), radial-gradient(circle at 0% 100%, rgba(224,137,27,0.22), transparent 45%)",
          color: "#f5f3ef",
          fontFamily: "Manrope",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse рендерит только обычный <img> */}
          <img src={emblem} width={98} height={72} alt="" />
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>
            <span>Caravan</span>
            <span style={{ color: "#f6b73c" }}>House</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 58, fontWeight: 800, lineHeight: 1.1, letterSpacing: -2 }}>
          <span>{meta.ogTagline}</span>
          <span style={{ color: "#f6b73c" }}>{meta.ogTaglineAccent}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28, fontWeight: 500, color: "#b0a99d" }}>
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
