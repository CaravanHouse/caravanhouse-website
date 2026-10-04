import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/locales";
import { projects as projectMeta, projectsOrgUrl, type ProjectMeta } from "@/lib/projects";
import { botUrl } from "@/lib/site";
import ButtonLink from "./ui/ButtonLink";
import GithubIcon from "./ui/GithubIcon";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import TelegramIcon from "./ui/TelegramIcon";
import Glow from "./ui/Glow";

const glow: Record<ProjectMeta["id"], string> = {
  "shop-miniapp": "from-rose-400/30 via-rose-400/5 to-transparent",
  configurator: "from-accent/30 via-accent/5 to-transparent",
  "quiz-bot": "from-accent-deep/40 via-accent-deep/5 to-transparent",
  "focus-garden-tg": "from-emerald-400/30 via-emerald-400/5 to-transparent",
};

// Карточка на всю ширину сетки (1 колонка на телефоне, 2 на планшете и десктопе)
const sizes = "(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw";

function Shot({ meta, alt }: { meta: ProjectMeta; alt: string }) {
  if (meta.frame === "browser") {
    return (
      <div className="absolute top-6 left-1/2 w-[88%] -translate-x-1/2 overflow-hidden rounded-t-xl border border-white/15 bg-[#f6f2ec] shadow-2xl shadow-black/50 transition-transform duration-500 group-hover:-translate-y-1.5 sm:top-8">
        <div aria-hidden="true" className="flex h-5 items-center gap-1.5 bg-[#201c17] px-3 sm:h-6">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
        </div>
        <Image src={meta.shot} alt={alt} sizes={sizes} placeholder="blur" className="h-auto w-full" />
      </div>
    );
  }
  return (
    <div
      className={`absolute left-1/2 w-[46%] max-w-[260px] -translate-x-1/2 overflow-hidden rounded-[1.6rem] border-[5px] border-[#070605] bg-[#070605] shadow-2xl shadow-black/60 ring-1 ring-white/15 transition-transform duration-500 group-hover:-translate-y-1.5 top-6 sm:top-8`}
    >
      <Image src={meta.shot} alt={alt} sizes="(min-width: 768px) 260px, 46vw" placeholder="blur" className="h-auto w-full rounded-[1.2rem]" />
    </div>
  );
}

export default function Projects({ dict }: { dict: Dictionary }) {
  const { projects } = dict;
  const items = projectMeta.flatMap((meta) => {
    const text = projects.items.find((item) => item.id === meta.id);
    return text ? [{ text, meta }] : [];
  });

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative overflow-x-clip py-20 sm:py-28">
      <Glow className="top-1/3 -right-40 h-[460px] w-[560px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="projects-title" eyebrow={projects.eyebrow} title={projects.title} subtitle={projects.subtitle} />
          <ButtonLink href={botUrl("site_projects")} external variant="secondary" className="self-start lg:self-auto">
            {projects.askCta}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:gap-6">
          {items.map(({ text, meta }, index) => {
            const live = Boolean(meta.demoUrl);
            const cta = meta.demoKind === "telegram" ? projects.openTelegram : projects.openWeb;
            const body = (
              <>
                <div className={`relative aspect-[16/11] overflow-hidden bg-gradient-to-br sm:aspect-[16/10] ${glow[meta.id]}`}>
                  <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
                  <Shot meta={meta} alt={text.imageAlt} />
                </div>

                <div className="relative flex flex-1 flex-col border-t border-line p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{text.category}</p>
                    <span className="rounded-full border border-line-strong px-2.5 py-1 text-xs font-semibold text-muted">{projects.badge}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">{text.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{text.description}</p>

                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={projects.stackLabel}>
                    {meta.stack.map((tech) => (
                      <li key={tech} className="rounded-md bg-white/[0.05] px-2 py-1 text-xs font-medium text-muted">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    {live ? (
                      <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-on-accent transition-colors group-hover:bg-accent-soft">
                        {meta.demoKind === "telegram" ? <TelegramIcon className="h-4 w-4" /> : null}
                        {cta}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </span>
                    ) : (
                      <span className="inline-flex min-h-11 items-center rounded-full border border-dashed border-line-strong px-5 text-sm font-medium text-muted">
                        {projects.demoSoon}
                      </span>
                    )}
                  </div>
                </div>
              </>
            );

            return (
              <Reveal as="li" key={meta.id} delay={(index % 2) * 0.08} className="h-full">
                {live ? (
                  <a
                    href={meta.demoUrl ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card group flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-accent/40"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="card group flex h-full flex-col overflow-hidden">{body}</div>
                )}
              </Reveal>
            );
          })}
        </ul>

        <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          {projects.codeNote}
          <a
            href={projectsOrgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded font-semibold text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent"
          >
            <GithubIcon className="h-4 w-4" />
            {projects.codeLinkLabel}
          </a>
        </p>
      </div>
    </section>
  );
}
