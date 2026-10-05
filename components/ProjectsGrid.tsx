"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Dictionary } from "@/locales";
import type { ProjectMeta } from "@/lib/projects";
import Reveal from "./ui/Reveal";
import TelegramIcon from "./ui/TelegramIcon";

type Item = { text: Dictionary["projects"]["items"][number]; meta: ProjectMeta };
type Tab = "all" | ProjectMeta["group"];

const glow: Record<ProjectMeta["id"], string> = {
  clinic: "from-emerald-400/25 via-emerald-400/5 to-transparent",
  crm: "from-violet-400/30 via-violet-400/5 to-transparent",
  store: "from-orange-300/30 via-orange-300/5 to-transparent",
  edu: "from-fuchsia-400/30 via-fuchsia-400/5 to-transparent",
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

/** Сетка демо с вкладками «Все / Сайты / Telegram» */
export default function ProjectsGrid({ items, projects }: { items: Item[]; projects: Dictionary["projects"] }) {
  const [tab, setTab] = useState<Tab>("all");
  const visible = items.filter(({ meta }) => tab === "all" || meta.group === tab);
  const count = (t: Tab) => items.filter(({ meta }) => t === "all" || meta.group === t).length;

  return (
    <>
      <div role="tablist" aria-label={projects.title} className="-mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 lg:mt-12">
        {(["all", "web", "telegram"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
              tab === t ? "border-accent bg-accent text-on-accent" : "border-line-strong text-muted hover:text-fg"
            }`}
          >
            {projects.tabs[t]}
            <span className={`rounded-full px-1.5 text-xs ${tab === t ? "bg-on-accent/15" : "bg-white/[0.06]"}`}>{count(t)}</span>
          </button>
        ))}
      </div>

        <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:gap-6">
          {visible.map(({ text, meta }, index) => {
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
    </>
  );
}
