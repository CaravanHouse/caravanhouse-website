import { ArrowDown, Check, Sparkles } from "lucide-react";
import type { Dictionary } from "@/locales";
import { contacts } from "@/lib/site";
import ButtonLink from "./ui/ButtonLink";
import TelegramIcon from "./ui/TelegramIcon";
import HeroChat from "./HeroChat";

type Props = { dict: Dictionary };

// Hero рендерится на сервере и анимируется чистым CSS — ничего не ждёт гидрации,
// поэтому заголовок (LCP) показывается сразу.
export default function Hero({ dict }: Props) {
  const { hero } = dict;
  const { mockup } = hero;

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 lg:pt-44 lg:pb-20">
      {/* Фон: сетка и янтарные/синие свечения */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute top-40 -right-40 h-[420px] w-[420px] rounded-full bg-[#3b5bdb]/20 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8">
        <div className="flex flex-col items-start">
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent-soft sm:text-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {hero.badge}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.35rem] leading-[1.05] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            {hero.titleBefore}
            <span className="text-gradient-accent">{hero.titleAccent}</span>
            {hero.titleAfter}
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg"
            style={{ animationDelay: "80ms" }}
          >
            {hero.subtitle}
          </p>

          <div
            className="animate-fade-up mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            style={{ animationDelay: "160ms" }}
          >
            <ButtonLink href={contacts.telegramUrl} external size="lg">
              <TelegramIcon className="h-5 w-5" />
              {hero.primary}
            </ButtonLink>
            <ButtonLink href="#services" variant="secondary" size="lg">
              {hero.secondary}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>

          <ul
            className="animate-fade-up mt-8 flex flex-col gap-2.5 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-6"
            style={{ animationDelay: "240ms" }}
          >
            {hero.points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Декоративный макет чата с ботом: переписка «оживает» при заходе на сайт */}
        <HeroChat mockup={mockup} />
      </div>
    </section>
  );
}
