"use client";

import { useCallback, useEffect, useState } from "react";
import { LAB_PALETTES, type LabPalette } from "@/lib/paletteLab";

// Лаборатория цветов для превью: перекрашивает сайт через CSS-переменные темы (--color-*).
// Выбор хранится в ссылке (?palette=7), чтобы можно было отправить конкретный вариант.
// Плашка оформлена своими цветами, а не токенами сайта, — остаётся читаемой при любой палитре.

const STYLE_ID = "palette-lab-rules";

function rulesFor(p: LabPalette) {
  const rules = [
    // золотой маркер под фразой в заголовке задан жёстко — перекрашиваем под палитру
    ".marker{background-image:linear-gradient(100deg,color-mix(in srgb,var(--color-accent) 75%,transparent),color-mix(in srgb,var(--color-accent-soft) 90%,transparent))!important}",
  ];
  if (p.dark) {
    rules.push(
      // тёмные кнопки на тёмном фоне: светлый текст и тонкий контур
      ".bg-on-accent.text-bg{color:var(--color-fg)!important;box-shadow:inset 0 0 0 1px var(--color-line-strong)}",
      // на тёмном фоне знак логотипа — золотой
      'img[src*="emblem-dark"]{content:url("/brand/emblem.png")}',
    );
  }
  if (p.lightOnAccent) {
    // на акценте белый текст — тёмные кнопки рисуем цветом текста, а не белым
    rules.push(".bg-on-accent.text-bg{background-color:var(--color-fg)!important;color:var(--color-bg)!important}");
  }
  return rules.join("\n");
}

function apply(p: LabPalette) {
  const root = document.documentElement;
  for (const [name, value] of Object.entries(p.colors)) root.style.setProperty(`--color-${name}`, value);
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  style.textContent = rulesFor(p);
}

function initialIndex() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("palette");
    const i = LAB_PALETTES.findIndex((p) => p.id === fromUrl);
    return i >= 0 ? i : 0;
  } catch {
    return 0;
  }
}

const btn: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 999,
  border: "1px solid rgb(255 255 255 / 0.25)",
  background: "rgb(255 255 255 / 0.08)",
  color: "#fff",
  fontSize: 20,
  lineHeight: 1,
  cursor: "pointer",
  flex: "none",
};

export default function PaletteLab() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // ссылку (?palette=) можно прочитать только в браузере после монтирования, иначе разойдётся гидратация
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndex(initialIndex());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const p = LAB_PALETTES[index];
    apply(p);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("palette", p.id);
      window.history.replaceState(null, "", url);
    } catch {}
  }, [index, ready]);

  const step = useCallback((d: number) => setIndex((i) => (i + d + LAB_PALETTES.length) % LAB_PALETTES.length), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName)) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  if (!ready) return null;
  const p = LAB_PALETTES[index];

  return (
    <div
      role="region"
      aria-label="Лаборатория цветов"
      style={{
        position: "fixed",
        left: 12,
        bottom: "max(12px, env(safe-area-inset-bottom))",
        zIndex: 70,
        width: "min(360px, calc(100vw - 96px))",
        background: "rgb(20 18 15 / 0.94)",
        color: "#fff",
        borderRadius: 20,
        padding: 10,
        boxShadow: "0 20px 50px -20px rgb(0 0 0 / 0.6)",
        backdropFilter: "blur(8px)",
        fontFamily: "var(--font-montserrat), system-ui, sans-serif",
      }}
    >
      {open ? (
        <div style={{ maxHeight: "50vh", overflowY: "auto", display: "grid", gap: 6, marginBottom: 10 }}>
          {LAB_PALETTES.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setIndex(i);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                textAlign: "left",
                padding: "8px 10px",
                borderRadius: 12,
                border: i === index ? "1px solid #fff" : "1px solid transparent",
                background: "rgb(255 255 255 / 0.06)",
                color: "#fff",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              <span style={{ display: "flex", flex: "none" }}>
                {["bg", "accent", "accent-ink", "on-accent"].map((k) => (
                  <span
                    key={k}
                    style={{ width: 14, height: 22, background: item.colors[k], border: "1px solid rgb(255 255 255 / 0.2)" }}
                  />
                ))}
              </span>
              {item.name}
            </button>
          ))}
        </div>
      ) : null}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button type="button" aria-label="Предыдущая палитра" onClick={() => step(-1)} style={btn}>
          ‹
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          style={{ flex: 1, minWidth: 0, background: "none", border: 0, color: "#fff", textAlign: "left", cursor: "pointer", padding: 0 }}
        >
          <div style={{ fontSize: 14, fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {p.name}
          </div>
          <div style={{ fontSize: 11, opacity: 0.75, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {index + 1}/{LAB_PALETTES.length} · {p.note} · {open ? "свернуть" : "все палитры"}
          </div>
        </button>
        <button type="button" aria-label="Следующая палитра" onClick={() => step(1)} style={btn}>
          ›
        </button>
      </div>
    </div>
  );
}
