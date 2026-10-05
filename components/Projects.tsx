import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/locales";
import { projects as projectMeta, projectsOrgUrl } from "@/lib/projects";
import { botUrl } from "@/lib/site";
import ButtonLink from "./ui/ButtonLink";
import GithubIcon from "./ui/GithubIcon";
import ProjectsGrid from "./ProjectsGrid";
import SectionHeading from "./ui/SectionHeading";
import Glow from "./ui/Glow";

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

        <ProjectsGrid items={items} projects={projects} />

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
