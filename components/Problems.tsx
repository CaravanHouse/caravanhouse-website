import type { Dictionary } from "@/locales";
import SectionHeading from "./ui/SectionHeading";

// Боль → решение: таблица из двух колонок с линиями, без карточек. На телефоне — пары друг под другом.
export default function Problems({ dict }: { dict: Dictionary }) {
  const t = dict.problems;

  return (
    <section id="problems" aria-labelledby="problems-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="problems-title" title={t.title} />

        <div className="mt-12 lg:mt-16">
          <div aria-hidden="true" className="hidden grid-cols-2 gap-10 border-b border-fg pb-3 text-sm font-semibold md:grid">
            <span className="text-subtle">{t.problemLabel}</span>
            <span className="text-accent-ink">{t.solutionLabel}</span>
          </div>
          <dl>
            {t.items.map((item) => (
              <div key={item.problem} className="grid gap-2 border-b border-line py-6 md:grid-cols-2 md:gap-10 md:py-8">
                <dt className="text-lg font-semibold leading-snug text-muted line-through decoration-line-strong decoration-1 sm:text-xl">
                  <span className="sr-only">{t.problemLabel}: </span>
                  {item.problem}
                </dt>
                <dd className="text-lg leading-snug sm:text-xl">
                  <span className="sr-only">{t.solutionLabel}: </span>
                  {item.solution}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
