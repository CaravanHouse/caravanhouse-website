import Link from "next/link";
import { useId } from "react";
import type { Locale } from "@/locales";

// Значок: «дом-шатёр» каравана — крыша-шеврон и арка входа на янтарном градиенте.
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  // Уникальный id градиента: значок встречается на странице несколько раз.
  const gradientId = `ch-logo-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFD98A" />
          <stop offset="0.55" stopColor="#F6B73C" />
          <stop offset="1" stopColor="#E0891B" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${gradientId})`} />
      <path
        d="M7.5 20.5 16 9.5l8.5 11"
        fill="none"
        stroke="#1A1204"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.75 24v-3.25a3.25 3.25 0 0 1 6.5 0V24"
        fill="none"
        stroke="#1A1204"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({ lang, label }: { lang: Locale; label: string }) {
  return (
    <Link
      href={`/${lang}`}
      aria-label={label}
      className="group inline-flex items-center gap-2.5 rounded-lg text-lg font-extrabold tracking-tight text-fg"
    >
      <LogoMark className="h-8 w-8 transition-transform duration-300 group-hover:-rotate-6" />
      <span>
        Caravan<span className="text-accent">House</span>
      </span>
    </Link>
  );
}
