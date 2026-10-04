// Страница 404 для любого адреса, которого нет на сайте. Язык по адресу не определить, поэтому
// текст сразу на русском и узбекском. Этот файл обходит layout, поэтому стили и шрифт подключаем сами.
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import emblem from "@/public/brand/emblem.png";
import { contacts } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  title: "404 — страница не найдена · CaravanHouse",
  description: "Такой страницы нет. Перейдите на главную CaravanHouse.",
  robots: { index: false },
};

const btn = "inline-flex h-12 items-center justify-center rounded-full px-6 font-semibold transition-colors";

export default function GlobalNotFound() {
  return (
    <html lang="ru" className={`${manrope.variable} antialiased`}>
      <body className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]" />
          <div className="absolute top-1/3 left-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" />
        </div>
        <main className="flex max-w-xl flex-col items-center text-center">
          <Image src={emblem} alt="CaravanHouse" width={88} height={65} priority />
          <p className="text-gradient-accent mt-8 text-7xl font-extrabold tracking-tight sm:text-8xl">404</p>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl">Страница не найдена</h1>
          <p className="mt-1 text-lg text-muted" lang="uz-Latn">Sahifa topilmadi</p>
          <p className="mt-5 leading-relaxed text-muted">
            Возможно, ссылка устарела или в адресе опечатка. Караван ушёл дальше — вернёмся на главную.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/ru" className={`${btn} bg-accent text-on-accent hover:bg-accent-soft`}>
              На главную
            </Link>
            <Link href="/uz" lang="uz-Latn" className={`${btn} border border-line-strong text-fg hover:bg-white/[0.06]`}>
              Bosh sahifaga
            </Link>
            <a href={contacts.telegramUrl} className={`${btn} border border-line-strong text-fg hover:bg-white/[0.06]`}>
              Написать в Telegram
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
