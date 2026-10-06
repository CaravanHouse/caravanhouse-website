import type { MetadataRoute } from "next";
import { locales } from "@/locales";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Главная и страница для учебных центров на обоих языках
  const pages = [
    { path: "", priority: 1 },
    { path: "/education", priority: 0.8 },
  ];
  return pages.flatMap(({ path, priority }) => {
    const languages = Object.fromEntries(locales.map((lang) => [lang, `${SITE_URL}/${lang}${path}`]));
    return locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: lang === "ru" ? priority : Math.round(priority * 90) / 100,
      alternates: { languages },
    }));
  });
}
