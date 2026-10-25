import { Bot, Check, Gift } from "lucide-react";
import type { Dictionary } from "@/locales";
import { formatSum, type Prices } from "@/lib/prices";
import { botUrl } from "@/lib/site";
import ButtonLink from "./ui/ButtonLink";
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
    <section id="prices" aria-labelledby="prices-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="prices-title" title={t.title} subtitle={t.subtitle} />

        <ul className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:items-stretch">
          {list.map(({ id, price: label, featured }) => {
            const pkg = t.packages[id];
            return (
              <li
                key={id}
                className={`flex flex-col rounded-[1.75rem] p-7 sm:p-8 ${featured ? "scope-dark lg:-my-4 lg:py-12" : "border border-line bg-bg"}`}
              >
                {featured ? <p className="mb-4 self-start rounded-full bg-accent px-3 py-1 text-xs font-bold text-on-accent">{t.popular}</p> : null}
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{pkg.title}</h3>
                <p className="mt-2 text-muted">{pkg.note}</p>
                <p className={`mt-6 text-2xl font-extrabold tracking-tight sm:text-3xl ${featured ? "text-accent" : ""}`}>{label}</p>
                <ul className="mt-7 flex flex-col gap-3 border-t border-line pt-7">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 leading-snug">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <ButtonLink href={botUrl("site_prices")} external variant={featured ? "primary" : "secondary"} className="w-full">
                    {t.choose}
                  </ButtonLink>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 grid gap-5 lg:mt-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col gap-4 rounded-[1.75rem] border border-line p-6 sm:flex-row sm:items-start sm:gap-5 sm:p-7">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-wash text-accent-ink">
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
