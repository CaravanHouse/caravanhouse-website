import { CalendarCheck, Cpu, HandCoins, Headset, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/locales";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const icons: Record<string, LucideIcon> = {
  deadlines: CalendarCheck,
  support: Headset,
  tech: Cpu,
  price: HandCoins,
};

export default function Advantages({ dict }: { dict: Dictionary }) {
  const { advantages } = dict;

  return (
    <section aria-labelledby="advantages-title" className="relative overflow-x-clip py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-72 max-w-4xl -translate-y-1/2 soft-glow [--glow:rgb(246_183_60/0.14)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="advantages-title" eyebrow={advantages.eyebrow} title={advantages.title} />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {advantages.items.map((item, index) => {
            const Icon = icons[item.id] ?? Cpu;
            return (
              <Reveal as="li" key={item.id} delay={index * 0.06} className="card flex flex-col p-6">
                <Icon className="h-8 w-8 text-accent" aria-hidden="true" strokeWidth={1.75} />
                <h3 className="mt-5 text-lg font-bold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{item.description}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
