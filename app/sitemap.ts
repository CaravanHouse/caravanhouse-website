import type { MetadataRoute } from "next";
import { locales } from "@/locales";
import { SITE_URL } from "@/lib/site";
import { memberIds } from "@/lib/team";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((lang) => [lang, `${SITE_URL}/${lang}`]));

  const home: MetadataRoute.Sitemap = locales.map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    changeFrequency: "monthly",
    priority: lang === "ru" ? 1 : 0.9,
    alternates: { languages },
  }));
  // Страницы участников команды
  const members: MetadataRoute.Sitemap = memberIds.flatMap((id) =>
    locales.map((lang) => ({
      url: `${SITE_URL}/${lang}/team/${id}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}/team/${id}`])) },
    })),
  );
  return [...home, ...members];
}
