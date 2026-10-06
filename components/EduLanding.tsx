import Image from "next/image";
import { ArrowUpRight, BellOff, CalendarX, Globe, MessageSquareWarning, NotebookPen, Sparkles } from "lucide-react";
import type { Dictionary } from "@/locales";
import { botUrl, eduDemo, telegramUrl } from "@/lib/site";
import eduShot from "@/public/projects/edu.jpg";
import ButtonLink from "./ui/ButtonLink";
import Glow from "./ui/Glow";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import TelegramIcon from "./ui/TelegramIcon";

// Блоки страницы «Учебным центрам» (/ru/education). Цены, процесс и финальный призыв — общие компоненты главной
export function EduHero({ dict }: { dict: Dictionary }) {
  const t = dict.edu.hero;
  return (
    <section aria-labelledby="edu-title" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 lg:pt-40 lg:pb-24">
      <Glow strong className="-top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent-soft sm:text-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {t.eyebrow}
          </p>
          <h1 id="edu-title" className="mt-6 text-[2.2rem] leading-[1.08] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {t.title} <span className="shine-accent">{t.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg">{t.subtitle}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={botUrl("site_edu")} external size="lg" className="whitespace-nowrap">
              <TelegramIcon className="h-5 w-5" />
              {t.cta}
            </ButtonLink>
            <ButtonLink href={eduDemo.site} external size="lg" variant="secondary" className="whitespace-nowrap">
              {t.demo}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
        <Reveal className="relative">
          <div className="overflow-hidden rounded-2xl border border-line-strong bg-[#f6f2ec] shadow-2xl shadow-black/50">
            <div aria-hidden="true" className="flex h-7 items-center gap-1.5 bg-[#201c17] px-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            </div>
            <Image src={eduShot} alt={dict.edu.demo.site.title} sizes="(min-width: 1024px) 560px, 100vw" placeholder="blur" priority className="h-auto w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const problemIcons = [MessageSquareWarning, CalendarX, NotebookPen, BellOff];

export function EduProblems({ dict }: { dict: Dictionary }) {
  const t = dict.edu.problems;
  return (
    <section aria-labelledby="edu-problems-title" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="edu-problems-title" eyebrow={t.eyebrow} title={t.title} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {t.items.map((item, i) => {
            const Icon = problemIcons[i % problemIcons.length];
            return (
              <Reveal as="li" key={item.title} delay={i * 0.06} className="card flex flex-col p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg leading-snug font-bold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function EduDemos({ dict }: { dict: Dictionary }) {
  const t = dict.edu.demo;
  const cards = [
    { icon: Globe, ...t.site, href: eduDemo.site, button: t.site.button },
    { icon: TelegramIcon, ...t.bot, href: eduDemo.trialBot ? telegramUrl(eduDemo.trialBot) : null, button: eduDemo.trialBot ? t.bot.button : t.bot.soon },
    { icon: Sparkles, ...t.personal, href: botUrl("site_edu"), button: t.personal.button },
  ];
  return (
    <section id="demo" aria-labelledby="edu-demo-title" className="relative overflow-x-clip py-16 sm:py-24">
      <Glow className="top-1/3 -right-40 h-[420px] w-[520px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="edu-demo-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14 lg:gap-6">
          {cards.map(({ icon: Icon, title, text, href, button }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08} className="card flex flex-col p-6 sm:p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-bold tracking-tight">{title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{text}</p>
              <div className="mt-auto pt-6">
                {href ? (
                  <ButtonLink href={href} external variant={i === 2 ? "primary" : "secondary"}>
                    {button}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </ButtonLink>
                ) : (
                  <span className="inline-flex min-h-11 items-center rounded-full border border-dashed border-line-strong px-5 text-sm font-medium text-muted">{button}</span>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
