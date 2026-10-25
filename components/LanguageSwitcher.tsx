import Link from "next/link";
import { locales, localeMeta, type Locale } from "@/locales";

type Props = { lang: Locale; label: string; className?: string };

export default function LanguageSwitcher({ lang, label, className = "" }: Props) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="flex items-center rounded-full border border-line p-1 text-xs font-bold">
        {locales.map((locale) => {
          const active = locale === lang;
          return (
            <li key={locale}>
              <Link
                href={`/${locale}`}
                hrefLang={localeMeta[locale].htmlLang}
                lang={localeMeta[locale].htmlLang}
                aria-current={active ? "true" : undefined}
                className={`flex h-8 min-w-10 items-center justify-center rounded-full px-3 transition-colors ${
                  active ? "bg-fg text-bg" : "text-muted hover:text-fg"
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
