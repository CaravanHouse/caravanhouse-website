import { ArrowUpRight, Calculator, MessageCircleQuestion, ShoppingBag, Sprout, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/locales";
import { projects as projectMeta, type ProjectId } from "@/lib/projects";
import { contacts } from "@/lib/site";
import ButtonLink from "./ui/ButtonLink";
import GithubIcon from "./ui/GithubIcon";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

// Обложки — абстрактные градиенты с иконкой. Когда появятся скриншоты, их можно положить
// в /public/projects и вывести через next/image с осмысленным alt.
const covers: Record<ProjectId, { icon: LucideIcon; gradient: string }> = {
  "shop-miniapp": { icon: ShoppingBag, gradient: "from-rose-400/30 via-rose-400/5 to-transparent" },
  configurator: { icon: Calculator, gradient: "from-accent/30 via-accent/5 to-transparent" },
  "quiz-bot": { icon: MessageCircleQuestion, gradient: "from-[#3b5bdb]/35 via-[#3b5bdb]/5 to-transparent" },
  "focus-garden-tg": { icon: Sprout, gradient: "from-emerald-400/25 via-emerald-400/5 to-transparent" },
};

const linkClass =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-semibold transition-colors hover:border-white/25 hover:bg-white/[0.06]";

export default function Projects({ dict }: { dict: Dictionary }) {
  const { projects } = dict;
  const items = projectMeta.flatMap((meta) => {
    const text = projects.items.find((item) => item.id === meta.id);
    return text ? [{ ...text, ...meta }] : [];
  });

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

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:gap-6">
          {items.map((project, index) => {
            const { icon: Icon, gradient } = covers[project.id];
            return (
              <Reveal as="li" key={project.id} delay={(index % 2) * 0.08} className="card group flex flex-col overflow-hidden">
                <div aria-hidden="true" className={`relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br lg:aspect-[5/2] ${gradient}`}>
                  <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
                  <span className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-line-strong bg-bg/60 backdrop-blur transition-transform duration-500 group-hover:scale-105">
                    <Icon className="h-10 w-10 text-fg/85" strokeWidth={1.5} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{project.category}</p>
                    <span className="rounded-full border border-line-strong px-2.5 py-1 text-xs font-semibold text-muted">{projects.badge}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">{project.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{project.description}</p>

                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={projects.stackLabel}>
                    {project.stack.map((tech) => (
                      <li key={tech} className="rounded-md bg-white/[0.05] px-2 py-1 text-xs font-medium text-muted">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    {project.demoUrl ? (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} border-accent/40 text-accent-soft`}>
                        {projects.demoLink}
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : null}
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${projects.codeLink}: ${project.title}`}
                      className={`${linkClass} text-fg`}
                    >
                      <GithubIcon className="h-4 w-4" />
                      {projects.codeLink}
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
