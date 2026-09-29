import { getDictionary, hasLocale, locales } from "@/locales";
import { ogSize, renderOgImage } from "@/lib/og";

export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export function generateImageMetadata({ params }: { params: { lang: string } }) {
  const lang = hasLocale(params.lang) ? params.lang : "ru";
  return [{ id: "og", alt: getDictionary(lang).meta.ogAlt, size: ogSize, contentType }];
}

export default async function TwitterImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return renderOgImage(getDictionary(hasLocale(lang) ? lang : "ru").meta);
}
