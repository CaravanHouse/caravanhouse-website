import { ArrowDown, Check, Sparkles, UserPlus } from "lucide-react";
import type { Dictionary } from "@/locales";
import { contacts } from "@/lib/site";
import ButtonLink from "./ui/ButtonLink";
import TelegramIcon from "./ui/TelegramIcon";
import { LogoMark } from "./Logo";

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

        {/* Декоративный макет чата с ботом — для скринридеров скрыт */}
        <div aria-hidden="true" className="animate-fade-up relative mx-auto w-full max-w-sm" style={{ animationDelay: "200ms" }}>
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-accent/25 via-transparent to-[#3b5bdb]/25 blur-2xl" />
          <div className="rounded-[2rem] border border-line-strong bg-bg-elevated/90 p-2 shadow-2xl shadow-black/50">
            <div className="overflow-hidden rounded-[1.6rem] border border-line bg-[#0b1020]">
              <div className="flex items-center gap-3 border-b border-line bg-white/[0.03] px-4 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg ring-1 ring-line-strong">
                  <LogoMark className="h-5 w-auto" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold">{mockup.botName}</p>
                  <p className="text-xs text-subtle">{mockup.botStatus}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 bg-[radial-gradient(circle_at_30%_20%,rgb(246_183_60/0.06),transparent_60%)] px-4 py-5 text-sm">
                <p className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-white/[0.06] px-3.5 py-2.5">{mockup.greeting}</p>
                <p className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-accent px-3.5 py-2.5 font-medium text-on-accent">
                  {mockup.userMessage}
                </p>
                <div className="max-w-[90%] self-start">
                  <p className="rounded-2xl rounded-bl-md bg-white/[0.06] px-3.5 py-2.5">{mockup.botReply}</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {mockup.slots.map((slot, index) => (
                      <span
                        key={slot}
                        className={`rounded-xl border px-2 py-2 text-center text-xs font-semibold ${
                          index === 1 ? "border-accent/60 bg-accent/15 text-accent-soft" : "border-line text-muted"
                        }`}
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="max-w-[85%] self-start rounded-2xl rounded-bl-md border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-2.5 text-emerald-200">
                  {mockup.confirm}
                </p>
              </div>
            </div>
          </div>

          <div className="animate-float absolute -top-7 -right-2 flex sm:top-auto sm:right-auto sm:-bottom-6 sm:-left-10 items-center gap-3 rounded-2xl border border-line-strong bg-surface/95 px-4 py-3 shadow-xl shadow-black/40 backdrop-blur">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <UserPlus className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs text-subtle">{mockup.orderLabel}</span>
              <span className="block text-sm font-bold">{mockup.orderValue}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
