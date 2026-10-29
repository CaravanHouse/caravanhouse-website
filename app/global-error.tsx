"use client";

// Страница на случай ошибки в корневом layout. Заменяет весь документ, поэтому
// стили и шрифт подключаем сами (как в global-not-found.tsx). Язык неизвестен — текст на трёх языках.
import { Montserrat } from "next/font/google";
import Image from "next/image";
import emblem from "@/public/brand/emblem-dark.png";
import { botUrl } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-montserrat", display: "swap" });

const btn = "inline-flex h-12 items-center justify-center rounded-full px-6 font-semibold transition-colors";

export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="ru" className={`${montserrat.variable} antialiased`}>
      <body className="flex min-h-dvh items-center justify-center px-4 py-16">
        <title>Ошибка · CaravanHouse</title>
        <main className="flex max-w-xl flex-col items-center text-center">
          <Image src={emblem} alt="CaravanHouse" width={88} height={65} priority />
          <h1 className="mt-8 text-2xl font-bold sm:text-3xl">Что-то пошло не так</h1>
          <p className="mt-1 text-lg text-muted" lang="uz-Latn">Nimadir xato ketdi</p>
          <p className="text-lg text-muted" lang="en">Something went wrong</p>
          <p className="mt-5 leading-relaxed text-muted">
            Обновите страницу. Если ошибка повторится, напишите нам в Telegram — ответим и поможем.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => retry()} className={`${btn} bg-accent text-on-accent hover:bg-accent-soft`}>
              Попробовать снова
            </button>
            {/* обычная ссылка, а не Link: полная перезагрузка уводит из сломанного состояния приложения */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/ru" className={`${btn} border border-line-strong text-fg hover:bg-surface`}>
              На главную
            </a>
            <a href={botUrl("site_404")} className={`${btn} border border-line-strong text-fg hover:bg-surface`}>
              Написать в Telegram
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
