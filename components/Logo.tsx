import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/locales";
import emblem from "@/public/brand/emblem.png";
import logoFull from "@/public/brand/logo-full.png";

// Знак CaravanHouse: «C» с дорогой каравана. Исходник — public/brand/emblem.png (324×239, прозрачный фон).
// Декоративный: рядом всегда есть название, поэтому alt пустой.
export function LogoMark({ className = "h-8 w-auto" }: { className?: string }) {
  return <Image src={emblem} alt="" width={44} height={32} className={className} />;
}

type Props = { lang: Locale; label: string; variant?: "compact" | "full" };

// compact — знак + название (шапка), full — полный логотип с подписью IT COMPANY (футер)
export default function Logo({ lang, label, variant = "compact" }: Props) {
  if (variant === "full") {
    return (
      <Link href={`/${lang}`} aria-label={label} className="inline-flex rounded-lg">
        <Image src={logoFull} alt="CaravanHouse IT Company" width={184} height={120} className="h-auto w-46" />
      </Link>
    );
  }
  return (
    <Link
      href={`/${lang}`}
      aria-label={label}
      className="group inline-flex items-center gap-2.5 rounded-lg text-lg font-extrabold tracking-tight text-fg"
    >
      <LogoMark className="h-8 w-auto transition-transform duration-300 group-hover:scale-105 lg:h-9" />
      <span>
        Caravan<span className="text-accent">House</span>
      </span>
    </Link>
  );
}
