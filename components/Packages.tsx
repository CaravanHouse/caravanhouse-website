import { Bot, Check, Gift } from "lucide-react";
import type { Dictionary } from "@/locales";
import { formatSum, type Prices } from "@/lib/prices";
import { botUrl } from "@/lib/site";
import ButtonLink from "./ui/ButtonLink";
import GoldShapes from "./ui/GoldShapes";
import Parallax from "./ui/Parallax";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

type PackageId = keyof Dictionary["prices"]["packages"];

// Пакеты строятся на ценах калькулятора (единый источник): репетитор = лендинг, учебный центр = корпоративный сайт.
// Онлайн-школа считается индивидуально, бот — дополнение по цене «Telegram-бот».
export default function Packages({ dict, prices }: { dict: Dictionary; prices: Prices }) {
  const t = dict.prices;
  const from = (id: Prices["starting"][number]["id"]) => prices.starting.find((p) => p.id === id)!.from;
  const price = (n: number) => t.pricePattern.replace("{price}", formatSum(n));
  const payment = t.payment
    .replace("{pre}", String(prices.prepaymentPercent))
    .replace("{post}", String(100 - prices.prepaymentPercent))
    .replace("{support}", formatSum(prices.supportMonthlyFrom));

  const list: { id: PackageId; price: string; featured?: boolean }[] = [
    { id: "tutor", price: price(from("landing")) },
    { id: "center", price: price(from("corporate")), featured: true },
    { id: "online", price: t.packages.online.price },
  ];

  return (
    <section id="prices" aria-labelledby="prices-title" className="relative isolate overflow-hidden py-20 sm:py-28">
      <GoldShapes set="prices" />
      <div aria-hidden="true" className="soft-glow pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 [--glow:rgb(244_178_35/0.22)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading id="prices-title" title={t.title} subtitle={t.subtitle} />
        </Reveal>

        <ul className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:items-stretch">
          {list.map(({ id, price: label, featured }, index) => {
            const pkg = t.packages[id];
            return (
              <Parallax as="li" key={id} offset={featured ? -36 : 30} className="flex">
              <Reveal
                delay={index * 0.1}
                className={`relative flex w-full flex-col overflow-hidden rounded-[1.75rem] p-7 transition-[translate,box-shadow] duration-700 ease-soft hover:-translate-y-2 sm:p-8 ${
                  featured
                    ? "bg-accent text-on-accent shadow-[0_40px_80px_-40px_rgb(143_91_0/0.8)] lg:-my-4 lg:py-12"
                    : "border border-line bg-bg hover:shadow-[0_24px_50px_-30px_rgb(143_91_0/0.45)]"
                }`}
              >
                {featured ? (
                  <span aria-hidden="true" className="animate-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent" />
                ) : null}
                {featured ? <p className="relative mb-4 self-start rounded-full bg-fg px-3 py-1 text-xs font-bold text-accent">{t.popular}</p> : null}
                <h3 className="relative font-display text-xl font-bold tracking-[-0.02em] sm:text-2xl">{pkg.title}</h3>
                <p className={`relative mt-2 ${featured ? "text-on-accent/75" : "text-muted"}`}>{pkg.note}</p>
                <p className={`relative mt-6 text-2xl font-extrabold tracking-tight sm:text-3xl ${featured ? "" : "text-accent-ink"}`}>{label}</p>
                <ul className={`relative mt-7 flex flex-col gap-3 border-t pt-7 ${featured ? "border-on-accent/20" : "border-line"}`}>
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 leading-snug">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${featured ? "bg-fg text-accent" : "bg-accent text-on-accent"}`}>
                        <Check className="h-3 w-3" aria-hidden="true" strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="relative mt-auto pt-8">
                  <ButtonLink href={botUrl("site_prices")} external variant={featured ? "ink" : "secondary"} className="w-full">
                    {t.choose}
                  </ButtonLink>
                </div>
              </Reveal>
              </Parallax>
            );
          })}
        </ul>

        <div className="mt-6 grid gap-5 lg:mt-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col gap-4 rounded-[1.75rem] border border-line bg-bg p-6 sm:flex-row sm:items-start sm:gap-5 sm:p-7">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-on-accent">
              <Bot className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-lg font-bold">{t.addon.title}</span>
                <span className="font-semibold text-accent-ink">{price(from("bot"))}</span>
              </p>
              <p className="mt-1.5 leading-relaxed text-muted">{t.addon.text}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-[1.75rem] bg-accent-wash p-6 sm:p-7">
            <Gift className="mt-0.5 h-6 w-6 shrink-0 text-accent-ink" aria-hidden="true" />
            <div>
              <p className="font-bold">{t.offerTitle}</p>
              <p className="mt-1 leading-relaxed text-muted">{t.offerText}</p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted">{payment}</p>
      </div>
    </section>
  );
}
