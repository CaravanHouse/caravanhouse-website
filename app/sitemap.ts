import type { MetadataRoute } from "next";
import { locales } from "@/locales";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((lang) => [lang, `${SITE_URL}/${lang}`]));

  return locales.map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === "ru" ? 1 : 0.9,
    alternates: { languages },
  }));
}
