import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import MotionProvider from "@/components/MotionProvider";
import { getDictionary, hasLocale, localeMeta, locales } from "@/locales";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#070a12",
  colorScheme: "dark",
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
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={localeMeta[lang].htmlLang} className={`${manrope.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only rounded-full bg-accent px-5 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
        >
          {dict.a11y.skipToContent}
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
