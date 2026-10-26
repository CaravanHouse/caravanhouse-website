import type { Dictionary } from "@/locales";
import ParallaxWord from "./motion/ParallaxWord";
import GoldShapes from "./ui/GoldShapes";
import GrowLine from "./ui/GrowLine";
import Parallax from "./ui/Parallax";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

// Настоящая последовательность шагов — поэтому здесь номера. Линии над шагами дорисовываются по очереди.
export default function Process({ dict }: { dict: Dictionary }) {
  const { process } = dict;

  return (
    <section id="process" aria-labelledby="process-title" className="bg-fade-elevated relative isolate pt-20 pb-36 sm:pt-24 sm:pb-48 lg:pb-60">
      <GoldShapes set="process" />
      <ParallaxWord text="CaravanHouse" className="bottom-4" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading id="process-title" title={process.title} />
        </Reveal>

        <ol className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {process.steps.map((step, index) => (
            <Parallax as="li" key={step.title} offset={[10, 34, -14, 24][index]}>
            <Reveal delay={index * 0.15}>
              <GrowLine delay={0.2 + index * 0.25} />
              <span className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent font-display text-2xl font-bold text-on-accent shadow-[0_12px_30px_-12px_rgb(143_91_0/0.7)]">
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold tracking-tight">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
            </Reveal>
            </Parallax>
          ))}
        </ol>
      </div>
    </section>
  );
}
