import type { Dictionary } from "@/locales";
import { formatSum, type Prices } from "@/lib/prices";
import { botUrl } from "@/lib/site";
import Reveal from "./ui/Reveal";

type PackageId = keyof Dictionary["prices"]["packages"];

// Пакеты стоят ступенями, как столбики графика: пакет больше — плитка выше.
// Цены приходят из калькулятора (единый источник): репетитор = лендинг, учебный центр = корпоративный сайт.
const tiles: { id: PackageId; chapter: "sand" | "gold" | "terra"; height: string }[] = [
  { id: "tutor", chapter: "sand", height: "lg:min-h-[360px]" },
  { id: "center", chapter: "gold", height: "lg:min-h-[480px]" },
  { id: "online", chapter: "terra", height: "lg:min-h-[600px]" },
];

export default function Packages({ dict, prices }: { dict: Dictionary; prices: Prices }) {
  const t = dict.prices;
  const from = (id: Prices["starting"][number]["id"]) => prices.starting.find((p) => p.id === id)!.from;
  const price = (n: number) => t.pricePattern.replace("{price}", formatSum(n));
  const label: Record<PackageId, string> = {
    tutor: price(from("landing")),
    center: price(from("corporate")),
    online: t.packages.online.price,
  };
  const payment = t.payment
    .replace("{pre}", String(prices.prepaymentPercent))
    .replace("{post}", String(100 - prices.prepaymentPercent))
    .replace("{support}", formatSum(prices.supportMonthlyFrom));

  return (
    <section id="prices" data-chapter="night" aria-labelledby="prices-title" className="px-m py-28 sm:py-40">
      <div className="relative">
        <Reveal className="lg:absolute lg:top-0 lg:left-0 lg:w-[62%]">
          <h2 id="prices-title" className="t-head max-w-[16ch]">
            {t.title}
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-2 lg:mt-0 lg:min-h-[600px] lg:grid-cols-3 lg:items-end">
          {tiles.map(({ id, chapter, height }, index) => {
            const p = t.packages[id];
            return (
              <li key={id}>
                <Reveal delay={index * 0.09} className="h-full">
                  <article
                    data-chapter={chapter}
                    className={`flex h-full flex-col overflow-hidden rounded-[var(--radius)] ${height} transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-1.5`}
                  >
                    <div className="flex-1 p-7">
                      <h3 className="t-lead font-extrabold">{p.title}</h3>
                      <p className="t-small mt-1 font-semibold opacity-85">{p.note}</p>
                      <p className="t-head mt-6 text-[clamp(32px,3.6vw,56px)]">{label[id]}</p>
                      <ul className="t-body mt-6 space-y-2">
                        {p.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href={botUrl("site_prices")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-16 items-center justify-between bg-[var(--field-deep)] px-7 text-[17px] font-extrabold"
                    >
                      {t.choose}
                      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <h3 className="t-lead font-extrabold">
            {t.addon.title} · <span className="text-[#eea72a]">{price(from("bot"))}</span>
          </h3>
          <p className="t-body mt-3">{t.addon.text}</p>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
          <h3 className="t-lead font-extrabold text-[#eea72a]">{t.offerTitle}</h3>
          <p className="t-body mt-3">{t.offerText}</p>
          <p className="t-small mt-6 opacity-85">{payment}</p>
        </Reveal>
      </div>
    </section>
  );
}
