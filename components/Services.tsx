import { AppWindow, Bot, Check, MonitorSmartphone, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/locales";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Glow from "./ui/Glow";

const icons: Record<string, LucideIcon> = {
  bots: Bot,
  websites: MonitorSmartphone,
  miniapps: AppWindow,
};

export default function Services({ dict }: { dict: Dictionary }) {
  const { services } = dict;

  return (
    <section id="services" aria-labelledby="services-title" className="relative overflow-x-clip py-20 sm:py-28">
      <Glow className="top-24 -left-40 h-[420px] w-[520px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="services-title" eyebrow={services.eyebrow} title={services.title} subtitle={services.subtitle} />

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {services.items.map((service, index) => {
            const Icon = icons[service.id] ?? Bot;
            return (
              <Reveal
                as="li"
                key={service.id}
                delay={index * 0.08}
                className={`group card relative flex flex-col overflow-hidden p-6 transition-colors duration-300 hover:border-accent/35 sm:p-8 ${
                  index === 2 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight">{service.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{service.description}</p>

                <div className="mt-6 border-t border-line pt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-subtle">{services.includesLabel}</p>
                  <ul className="mt-4 flex flex-col gap-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-[0.95rem] leading-snug">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
