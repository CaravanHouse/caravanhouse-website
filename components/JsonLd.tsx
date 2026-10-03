import type { Dictionary, Locale } from "@/locales";
import { localeMeta } from "@/locales";
import { contacts, SITE_NAME, SITE_URL, socials } from "@/lib/site";

// Структурированные данные для поисковиков: организация и FAQ.
export default function JsonLd({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: `${SITE_URL}/${lang}`,
        logo: `${SITE_URL}/brand/logo-full.png`,
        description: dict.meta.description,
        email: contacts.email,
        telephone: contacts.phoneHref.replace("tel:", ""),
        areaServed: { "@type": "Country", name: "Uzbekistan" },
        address: { "@type": "PostalAddress", addressCountry: "UZ" },
        sameAs: socials.map((social) => social.href),
        inLanguage: localeMeta[lang].htmlLang,
      },
      {
        "@type": "FAQPage",
        inLanguage: localeMeta[lang].htmlLang,
        mainEntity: dict.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON экранируется, чтобы строка не могла закрыть тег <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
