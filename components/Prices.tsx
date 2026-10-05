import { AppWindow, ArrowUpRight, Bot, Building2, Calculator, Gift, LayoutTemplate, Smartphone, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/locales";
import { CALC_URL, formatSum, getPrices, type StartingPriceId } from "@/lib/prices";
import { botUrl } from "@/lib/site";
import ButtonLink from "./ui/ButtonLink";
import Glow from "./ui/Glow";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const icons: Record<StartingPriceId, LucideIcon> = {
  landing: LayoutTemplate,
  bot: Bot,
  corporate: Building2,
  miniapp: AppWindow,
};

export default async function Prices({ dict }: { dict: Dictionary }) {
  const t = dict.prices;
  const { prepaymentPercent, supportMonthlyFrom, starting } = await getPrices();
  const payment = t.payment
    .replace("{pre}", String(prepaymentPercent))
    .replace("{post}", String(100 - prepaymentPercent))
    .replace("{support}", formatSum(supportMonthlyFrom));

  return (
    <section id="prices" aria-labelledby="prices-title" className="relative overflow-x-clip py-20 sm:py-28">
      <Glow strong className="top-1/3 left-1/2 h-[420px] w-[820px] -translate-x-1/2" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="prices-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {starting.map(({ id, from }, index) => {
            const Icon = icons[id];
            const item = t.items[id];
            return (
              <Reveal as="li" key={id} delay={index * 0.06} className="card flex flex-col p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.note}</p>
                <p className="text-gradient-accent mt-auto pt-5 text-2xl font-extrabold tracking-tight">
                  {t.pricePattern.replace("{price}", formatSum(from))}
                </p>
              </Reveal>
            );
          })}
        </ul>

        {/* Мобильное приложение: цены нет в калькуляторе, поэтому отдельной полосой и без цифр */}
        <Reveal className="card mt-4 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between lg:mt-6">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
              <Smartphone className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-lg font-bold tracking-tight">
                {t.app.title}
                <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent-soft">
                  {t.app.badge}
                </span>
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{t.app.note}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-4 sm:justify-end">
            <p className="text-gradient-accent text-xl font-extrabold tracking-tight">{t.app.price}</p>
            <ButtonLink href={botUrl("site_prices")} external variant="secondary">
              {t.app.cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr] lg:gap-6">
          <Reveal className="card flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-on-accent">
                <Calculator className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-bold">{t.calcNote}</p>
                <p className="mt-1 text-sm text-muted">{payment}</p>
              </div>
            </div>
            <ButtonLink href={CALC_URL} external className="shrink-0">
              {t.calcCta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </Reveal>
          <Reveal className="flex items-start gap-4 rounded-3xl border border-accent/40 bg-accent/10 p-6 sm:p-7">
            <Gift className="mt-0.5 h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <p className="font-bold text-accent-soft">{t.offerTitle}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{t.offerText}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
