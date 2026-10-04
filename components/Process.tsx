import type { Dictionary } from "@/locales";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Glow from "./ui/Glow";

// Таймлайн: вертикальный на телефоне, горизонтальный на широких экранах.
export default function Process({ dict }: { dict: Dictionary }) {
  const { process } = dict;

  return (
    <section id="process" aria-labelledby="process-title" className="relative overflow-x-clip py-20 sm:py-28">
      <Glow className="top-1/2 left-1/2 h-[300px] w-[900px] -translate-x-1/2 -translate-y-1/2" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="process-title" eyebrow={process.eyebrow} title={process.title} />

        <ol className="relative mt-12 grid gap-8 lg:mt-16 lg:grid-cols-5 lg:gap-6">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-gradient-to-b from-accent/70 via-line-strong to-transparent lg:top-[1.375rem] lg:right-8 lg:bottom-auto lg:left-8 lg:h-px lg:w-auto lg:bg-gradient-to-r"
          />
          {process.steps.map((step, index) => {
            const number = String(index + 1).padStart(2, "0");
            return (
              <Reveal as="li" key={step.title} delay={index * 0.07} className="relative flex gap-5 lg:flex-col lg:gap-6">
                <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-bg text-sm font-extrabold text-accent shadow-[0_0_24px_-4px_rgb(246_183_60/0.45)]">
                  {number}
                </span>
                <div className="pt-1.5 lg:pt-0">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-subtle">
                    {process.stepLabel} {number}
                  </p>
                  <h3 className="mt-1.5 text-xl font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
