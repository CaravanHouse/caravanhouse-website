import Image from "next/image";
import { ArrowUpRight, BookOpen, CalendarDays, GraduationCap, Languages, ListChecks, PencilLine, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/locales";
import { eduDemo, otherDemos } from "@/lib/projects";
import ButtonLink from "./ui/ButtonLink";
import Tilt from "./motion/Tilt";
import Parallax from "./ui/Parallax";
import GoldShapes from "./ui/GoldShapes";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const icons: Record<string, LucideIcon> = {
  courses: BookOpen,
  schedule: CalendarDays,
  trial: PencilLine,
  test: ListChecks,
  teachers: GraduationCap,
  languages: Languages,
};

// Что будет на сайте + живой пример (демо учебного центра) в одном блоке
export default function SiteShowcase({ dict }: { dict: Dictionary }) {
  const t = dict.site;

  return (
    <section id="site" aria-labelledby="site-title" className="bg-fade-elevated relative isolate py-20 sm:py-24">
      <GoldShapes set="site" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading id="site-title" title={t.title} subtitle={t.subtitle} />
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {t.modules.map((module, index) => {
            const Icon = icons[module.id] ?? BookOpen;
            return (
              <Parallax as="li" key={module.id} offset={[18, -26, 34][index % 3]}>
              <Reveal
                delay={(index % 3) * 0.08}
                className="group flex h-full gap-4 rounded-3xl border border-line bg-bg p-5 transition-[translate,box-shadow,border-color] duration-700 ease-soft hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_20px_40px_-24px_rgb(143_91_0/0.45)] sm:p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-on-accent transition-transform duration-500 ease-soft group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold tracking-tight">{module.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{module.text}</p>
                </div>
              </Reveal>
              </Parallax>
            );
          })}
        </ul>

        <Reveal className="mt-16 grid items-center gap-10 rounded-[2rem] border border-line bg-bg p-5 sm:p-8 lg:mt-20 lg:grid-cols-[1.35fr_1fr] lg:gap-14 lg:p-10">
          <Tilt max={5}>
          <a
            href={eduDemo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-2xl border border-line shadow-[0_30px_70px_-40px_rgb(143_91_0/0.55)]"
          >
            <div aria-hidden="true" className="flex h-7 items-center gap-1.5 border-b border-line bg-surface px-3">
              <span className="h-2 w-2 rounded-full bg-line-strong" />
              <span className="h-2 w-2 rounded-full bg-line-strong" />
              <span className="h-2 w-2 rounded-full bg-line-strong" />
              <span className="ml-3 text-[0.7rem] text-subtle">edu.caravanhouse.uz</span>
            </div>
            <Image
              src={eduDemo.shot}
              alt={t.imageAlt}
              sizes="(min-width: 1280px) 700px, (min-width: 1024px) 55vw, 100vw"
              placeholder="blur"
              className="h-auto w-full transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
            />
          </a>
          </Tilt>

          <Parallax offset={-30}>
            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{t.demoTitle}</h3>
            <p className="mt-4 leading-relaxed text-muted">{t.demoText}</p>
            <ButtonLink href={eduDemo.url} external variant="ink" size="lg" className="mt-7">
              {t.demoCta}
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </ButtonLink>

            <div className="mt-9 border-t border-line pt-5">
              <p className="text-sm text-subtle">{t.othersTitle}</p>
              <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                {otherDemos.map((demo) => (
                  <li key={demo.id}>
                    <a
                      href={demo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold underline decoration-line-strong underline-offset-4 hover:decoration-fg"
                    >
                      {t.others[demo.id]}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
