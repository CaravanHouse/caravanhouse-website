import Link from "next/link";
import { locales, localeMeta, type Locale } from "@/locales";

// path — та же страница на другом языке (например, "/team/umid")
type Props = { lang: Locale; label: string; className?: string; path?: string };

export default function LanguageSwitcher({ lang, label, className = "", path = "" }: Props) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="flex items-center gap-1 text-[14px] font-extrabold">
        {locales.map((locale) => {
          const active = locale === lang;
          return (
            <li key={locale}>
              <Link
                href={`/${locale}${path}`}
                hrefLang={localeMeta[locale].htmlLang}
                lang={localeMeta[locale].htmlLang}
                aria-current={active ? "true" : undefined}
                className={`flex h-8 min-w-10 items-center justify-center rounded-full px-3 transition-colors ${
                  active ? "bg-current/15" : "opacity-90 hover:opacity-100"
                }`}
              >
                {localeMeta[locale].label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
