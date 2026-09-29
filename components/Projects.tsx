import { AppWindow, ArrowUpRight, Bot, MonitorSmartphone, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/locales";
import { contacts } from "@/lib/site";
import ButtonLink from "./ui/ButtonLink";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

// TODO: это карточки-заглушки. Когда появятся реальные кейсы:
//   1) обновите тексты в locales/ru.ts и locales/uz.ts (projects.items);
//   2) добавьте обложки в /public/projects и выведите их через next/image с осмысленным alt;
//   3) при необходимости добавьте ссылку на кейс и уберите бейдж «Скоро».
const covers: { icon: LucideIcon; gradient: string }[] = [
  { icon: Bot, gradient: "from-accent/30 via-accent/5 to-transparent" },
  { icon: MonitorSmartphone, gradient: "from-[#3b5bdb]/35 via-[#3b5bdb]/5 to-transparent" },
  { icon: AppWindow, gradient: "from-emerald-400/25 via-emerald-400/5 to-transparent" },
];

export default function Projects({ dict }: { dict: Dictionary }) {
  const { projects } = dict;

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="projects-title" eyebrow={projects.eyebrow} title={projects.title} subtitle={projects.subtitle} />
          <ButtonLink href={contacts.telegramUrl} external variant="secondary" className="self-start lg:self-auto">
            {projects.askCta}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {projects.items.map((project, index) => {
            const cover = covers[index % covers.length];
            const Icon = cover.icon;
            return (
              <Reveal as="li" key={project.title} delay={index * 0.08} className="card group flex flex-col overflow-hidden">
                <div aria-hidden="true" className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br ${cover.gradient}`}>
                  <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
                  <span className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-line-strong bg-bg/60 backdrop-blur transition-transform duration-500 group-hover:scale-105">
                    <Icon className="h-10 w-10 text-fg/85" strokeWidth={1.5} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{project.category}</p>
                    <span className="rounded-full border border-line-strong px-2.5 py-1 text-xs font-semibold text-muted">{projects.badge}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold tracking-tight">{project.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{project.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
