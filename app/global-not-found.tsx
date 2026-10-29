// Страница 404 для любого адреса, которого нет на сайте. Язык по адресу не определить, поэтому
// текст сразу на русском и узбекском. Этот файл обходит layout, поэтому стили и шрифт подключаем сами.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import emblem from "@/public/brand/emblem-dark.png";
import { botUrl } from "@/lib/site";
import "./globals.css";
import { montserrat } from "@/lib/fonts";


export const metadata: Metadata = {
  title: "404 — страница не найдена · CaravanHouse",
  description: "Такой страницы нет. Перейдите на главную CaravanHouse.",
  robots: { index: false },
};

const btn = "inline-flex h-12 items-center justify-center rounded-full px-6 font-semibold transition-colors";

export default function GlobalNotFound() {
  return (
    <html lang="ru" className={`${montserrat.variable} antialiased`}>
      <body className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]" />
        </div>
        <main className="flex max-w-xl flex-col items-center text-center">
          <Image src={emblem} alt="CaravanHouse" width={88} height={65} priority />
          <p className="font-display mt-8 text-7xl font-bold tracking-tight text-accent-ink sm:text-8xl">404</p>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl">Страница не найдена</h1>
          <p className="mt-1 text-lg text-muted" lang="uz-Latn">Sahifa topilmadi</p>
          <p className="text-lg text-muted" lang="en">Page not found</p>
          <p className="mt-5 leading-relaxed text-muted">
            Возможно, ссылка устарела или в адресе опечатка. Караван ушёл дальше — вернёмся на главную.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/ru" className={`${btn} bg-accent text-on-accent hover:bg-accent-soft`}>
              На главную
            </Link>
            <Link href="/uz" lang="uz-Latn" className={`${btn} border border-line-strong text-fg hover:bg-surface`}>
              Bosh sahifaga
            </Link>
            <Link href="/en" lang="en" className={`${btn} border border-line-strong text-fg hover:bg-surface`}>
              Home page
            </Link>
            <a href={botUrl("site_404")} className={`${btn} border border-line-strong text-fg hover:bg-surface`}>
              Написать в Telegram
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
