import type { Dictionary } from "@/locales";
import { Check } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import StrikeText from "./StrikeText";

// Боль → решение: таблица из двух колонок с линиями, без карточек. На телефоне — пары друг под другом.
export default function Problems({ dict }: { dict: Dictionary }) {
  const t = dict.problems;

  return (
    <section id="problems" aria-labelledby="problems-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading id="problems-title" title={t.title} />
        </Reveal>

        <div className="mt-12 lg:mt-16">
          <div aria-hidden="true" className="hidden grid-cols-2 gap-10 border-b-2 border-accent pb-3 text-sm font-semibold md:grid">
            <span className="text-subtle">{t.problemLabel}</span>
            <span className="text-accent-ink">{t.solutionLabel}</span>
          </div>
          <dl>
            {t.items.map((item, index) => (
              <Reveal key={item.problem} delay={index * 0.05} className="grid gap-3 border-b border-line py-6 md:grid-cols-2 md:gap-10 md:py-8">
                <dt className="text-lg font-semibold leading-snug text-muted sm:text-xl">
                  <span className="sr-only">{t.problemLabel}: </span>
                  <StrikeText delay={index * 0.1}>{item.problem}</StrikeText>
                </dt>
                <dd className="flex gap-3 text-lg leading-snug sm:text-xl">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                    <Check className="h-4 w-4" aria-hidden="true" strokeWidth={3} />
                  </span>
                  <span>
                    <span className="sr-only">{t.solutionLabel}: </span>
                    {item.solution}
                  </span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
