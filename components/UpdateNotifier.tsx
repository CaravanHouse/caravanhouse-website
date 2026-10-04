"use client";

import { RefreshCw, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/locales";

const CURRENT = process.env.NEXT_PUBLIC_BUILD_ID ?? "dev";
const CHECK_EVERY_MS = 5 * 60_000;

// Начал ли человек заполнять форму заявки — тогда страницу сами не перезагружаем
const formHasInput = () =>
  [...document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("#contacts input:not([type=radio]), #contacts textarea")].some(
    (el) => el.value.trim() !== ""
  );

/**
 * Следит за новыми версиями сайта, пока вкладка открыта.
 * Вкладка в фоне → тихо перезагружается, когда человек на неё вернётся.
 * Вкладку смотрят → внизу появляется плашка «Сайт обновился · Обновить».
 */
export default function UpdateNotifier({ t }: { t: Dictionary["update"] }) {
  const [available, setAvailable] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (CURRENT === "dev") return;
    let stale = false;
    let hiddenSinceStale = false;

    async function check() {
      if (stale) return;
      try {
        const res = await fetch("/api/version", { cache: "no-store" });
        const { version } = (await res.json()) as { version?: string };
        if (version && version !== CURRENT) {
          stale = true;
          hiddenSinceStale = document.visibilityState === "hidden";
          setAvailable(true);
        }
      } catch {
        /* нет сети — проверим позже */
      }
    }

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        if (stale) hiddenSinceStale = true;
        return;
      }
      // вернулись на вкладку: если версия устарела, пока её не видели, — обновляем молча
      if (stale && hiddenSinceStale && !formHasInput()) window.location.reload();
      else void check();
    };

    const timer = window.setInterval(check, CHECK_EVERY_MS);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", check);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", check);
    };
  }, []);

  if (!available || dismissed) return null;
  return (
    <div role="status" className="fixed inset-x-0 bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.5rem)] z-50 flex justify-center px-4 md:bottom-6">
      <div className="flex max-w-md items-center gap-3 rounded-full border border-accent/40 bg-bg-elevated/95 py-2 pr-2 pl-5 text-sm shadow-xl shadow-black/50 backdrop-blur">
        <span className="text-fg">{t.text}</span>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-4 font-semibold whitespace-nowrap text-on-accent hover:bg-accent-soft"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          {t.button}
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label={t.dismiss}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted hover:text-fg"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
