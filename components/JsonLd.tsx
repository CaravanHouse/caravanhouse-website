import type { Dictionary, Locale } from "@/locales";
import { localeMeta } from "@/locales";
import { contacts, SITE_NAME, SITE_URL, socials } from "@/lib/site";
import { formatSum, type Prices } from "@/lib/prices";

// Структурированные данные для поисковиков: организация и FAQ.
export default function JsonLd({ lang, dict, prices }: { lang: Locale; dict: Dictionary; prices: Prices }) {
  const minPrice = Math.min(...prices.starting.map((p) => p.from));
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        // Варианты названия: помогают Google отличить IT-компанию от одноимённых заведений
        alternateName: ["Caravan House", "CaravanHouse IT Company", "CaravanHouse Digital Studio"],
        url: `${SITE_URL}/${lang}`,
        logo: `${SITE_URL}/brand/logo-square.png`,
        image: `${SITE_URL}/brand/logo-square.png`,
        description: dict.meta.description,
        email: contacts.email,
        telephone: contacts.phoneHref.replace("tel:", ""),
        areaServed: { "@type": "Country", name: "Uzbekistan" },
        address: { "@type": "PostalAddress", addressLocality: "Tashkent", addressCountry: "UZ" },
        sameAs: socials.map((social) => social.href),
        inLanguage: localeMeta[lang].htmlLang,
        // Стартовые цены — из калькулятора calc.caravanhouse.uz, как и в блоке «Цены»
        priceRange: dict.prices.pricePattern.replace("{price}", formatSum(minPrice)),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: dict.prices.title,
          itemListElement: prices.starting.map((p) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: dict.prices.items[p.id].title, description: dict.prices.items[p.id].note },
            priceSpecification: { "@type": "PriceSpecification", minPrice: p.from, priceCurrency: "UZS" },
          })),
        },
      },
      {
        // Название сайта в выдаче Google берётся отсюда
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: ["Caravan House", "caravanhouse.uz"],
        url: `${SITE_URL}/`,
        inLanguage: ["ru", "uz-Latn"],
        publisher: { "@id": `${SITE_URL}/#organization` },
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
