import type { Dictionary } from "@/locales";
import SectionHeading from "./ui/SectionHeading";

// Настоящая последовательность шагов — поэтому здесь номера. Вертикально на телефоне, в ряд с lg.
export default function Process({ dict }: { dict: Dictionary }) {
  const { process } = dict;

  return (
    <section id="process" aria-labelledby="process-title" className="bg-bg-elevated py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="process-title" title={process.title} />

        <ol className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {process.steps.map((step, index) => (
            <li key={step.title} className="border-t-2 border-fg pt-6">
              <span className="font-display text-4xl font-semibold text-accent-ink tabular-nums">{index + 1}</span>
              <h3 className="mt-4 text-xl font-bold tracking-tight">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
