import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import MotionProvider from "@/components/MotionProvider";
import SmoothScroll from "@/components/SmoothScroll";
import { getDictionary, hasLocale, localeMeta, locales } from "@/locales";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#fbf5ec",
  colorScheme: "light",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    applicationName: SITE_NAME,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ru: "/ru",
        uz: "/uz",
        en: "/en",
        "x-default": "/ru",
      },
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      siteName: SITE_NAME,
      title: meta.title,
      description: meta.description,
      locale: localeMeta[lang].ogLocale,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeMeta[l].ogLocale),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: { index: true, follow: true },
    // Подтверждение прав в Яндекс Вебмастере (дублирует файл public/yandex_8bd107ad89226282.html)
    verification: { yandex: "8bd107ad89226282" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={localeMeta[lang].htmlLang} className={`${montserrat.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Класс js до первой отрисовки: анимации появления (Reveal) прячут блоки только при работающем JS.
            Страховка: если за 4 с скрипты так и не запустились (сеть, ошибка), класс снимаем и всё видно. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__revealReady)document.documentElement.classList.remove('js')},4000)",
          }}
        />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only rounded-full bg-accent px-5 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
        >
          {dict.a11y.skipToContent}
        </a>
        <MotionProvider>
          <SmoothScroll />
          {children}
        </MotionProvider>
        {/* Vercel Web Analytics: посещения без cookie, данные в Vercel → Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
