import { Check } from "lucide-react";
import type { Dictionary } from "@/locales";
import { eduDemo } from "@/lib/projects";
import { botUrl } from "@/lib/site";
import ButtonLink from "./ui/ButtonLink";
import TelegramIcon from "./ui/TelegramIcon";

type Props = { dict: Dictionary };

// Расписание групп — то, что учебный центр показывает на сайте. Названия групп одинаковы на обоих языках.
// null — пустое окно; "trial" — окно, в которое «записывается» ученик (анимация при загрузке).
type Slot = { group: string; seats?: string } | "trial" | null;
const times = ["10:00", "14:00", "17:00"];
const grid: Slot[][] = [
  [{ group: "English A2", seats: "6/8" }, null, { group: "English A2" }, null, { group: "English A2" }, { group: "Kids" }],
  [null, { group: "IELTS", seats: "3/10" }, null, { group: "IELTS" }, null, "trial"],
  [{ group: "Math", seats: "5/8" }, { group: "IT" }, { group: "Math" }, { group: "IT" }, { group: "Math" }, null],
];
// На телефоне показываем Пн, Ср и Сб — так клетка с пробным уроком (суббота) остаётся видна
const hiddenOnPhone = new Set([1, 3, 4]);

function Schedule({ t }: { t: Dictionary["hero"]["schedule"] }) {
  // у ячеек display: flex, поэтому на широких экранах возвращаем именно flex, а не block
  const col = (day: number, display: "block" | "flex" = "flex") => !hiddenOnPhone.has(day) ? "" : display === "flex" ? "hidden sm:flex" : "hidden sm:block";
  return (
    <figure aria-label={t.label} className="animate-float relative">
      <div className="rounded-[1.75rem] border border-line bg-bg p-4 shadow-[0_40px_90px_-40px_rgb(143_91_0/0.45)] sm:p-6">
        <figcaption className="flex items-baseline justify-between gap-4">
          <span className="font-display text-base font-semibold tracking-tight sm:text-lg">{t.title}</span>
          <span className="text-xs text-subtle">edu.caravanhouse.uz</span>
        </figcaption>

        <div className="mt-5 grid grid-cols-[2.75rem_repeat(3,minmax(0,1fr))] gap-1.5 text-[0.7rem] sm:grid-cols-[3.25rem_repeat(6,minmax(0,1fr))] sm:gap-2 sm:text-xs">
          <span />
          {t.days.map((day, i) => (
            <span key={day} className={`pb-1 text-center font-semibold text-subtle ${col(i, "block")}`}>
              {day}
            </span>
          ))}

          {grid.map((row, r) => (
            <div key={times[r]} className="contents">
              <span className="flex items-center text-subtle tabular-nums">{times[r]}</span>
              {row.map((slot, d) => {
                const key = `${r}-${d}`;
                if (slot === "trial") {
                  return (
                    <span
                      key={key}
                      className={`animate-slot-fill flex min-h-14 flex-col justify-center rounded-xl border border-dashed px-2 py-2 font-semibold leading-tight sm:min-h-16 ${col(d)}`}
                    >
                      {t.trial}
                      <span className="font-normal opacity-80">English A2</span>
                    </span>
                  );
                }
                if (!slot) {
                  return <span key={key} className={`min-h-14 rounded-xl border border-dashed border-line sm:min-h-16 ${col(d, "block")}`} />;
                }
                return (
                  <span
                    key={key}
                    style={{ animationDelay: `${300 + (r * 6 + d) * 70}ms` }}
                    className={`animate-pop-in flex min-h-14 flex-col justify-center rounded-xl bg-surface px-2 py-2 leading-tight sm:min-h-16 ${col(d)}`}
                  >
                    <span className="font-semibold">{slot.group}</span>
                    {slot.seats ? (
                      <span className="text-muted">
                        {slot.seats} {t.seats}
                      </span>
                    ) : null}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Уведомление, которое администратор получает в Telegram после записи */}
      <div
        aria-hidden="true"
        className="animate-toast-in absolute -bottom-12 left-3 right-3 flex items-start gap-3 rounded-2xl border border-line bg-bg p-3.5 shadow-[0_24px_60px_-24px_rgb(29_26_22/0.45)] sm:-bottom-10 sm:left-auto sm:-right-4 sm:w-80 lg:-right-8"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2aabee] text-white">
          <TelegramIcon className="h-5 w-5" />
        </span>
        <span className="min-w-0 text-sm leading-snug">
          <span className="block font-semibold">{t.toastTitle}</span>
          <span className="block text-muted">{t.toastText}</span>
          <span className="mt-0.5 block text-xs text-subtle">{t.toastFrom}</span>
        </span>
      </div>
    </figure>
  );
}

// Hero рендерится на сервере, анимация — чистый CSS: заголовок (LCP) показывается сразу.
export default function Hero({ dict }: Props) {
  const { hero } = dict;

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 lg:pt-40 lg:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-notebook absolute inset-0 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]" />
        <div className="soft-glow absolute -top-48 -right-40 h-[640px] w-[760px]" />
        <div className="soft-glow absolute -bottom-40 -left-48 h-[420px] w-[560px] [--glow:rgb(255_201_77/0.28)]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:px-8">
        <div className="flex flex-col items-start">
          <h1
            id="hero-title"
            className="animate-fade-up font-display text-[1.9rem] leading-[1.15] font-semibold tracking-[-0.03em] text-balance sm:text-[2.75rem] xl:text-[3.05rem]"
          >
            {hero.titleBefore}
            <span className="marker">{hero.titleMark}</span>
            {hero.titleAfter}
          </h1>

          <p className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg" style={{ animationDelay: "120ms" }}>
            {hero.subtitle}
          </p>

          <div className="animate-fade-up mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row" style={{ animationDelay: "240ms" }}>
            <ButtonLink href={botUrl("site_hero")} external size="lg">
              <TelegramIcon className="h-5 w-5" />
              {hero.primary}
            </ButtonLink>
            <ButtonLink href={eduDemo.url} external variant="secondary" size="lg">
              {hero.secondary}
            </ButtonLink>
          </div>

          <ul className="animate-fade-up mt-8 flex flex-col gap-2.5 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-6" style={{ animationDelay: "360ms" }}>
            {hero.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                  <Check className="h-3 w-3" aria-hidden="true" strokeWidth={3} />
                </span>
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <Schedule t={hero.schedule} />
      </div>
    </section>
  );
}
