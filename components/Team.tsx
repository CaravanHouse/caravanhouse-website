import Image from "next/image";
import type { Dictionary } from "@/locales";
import { team } from "@/lib/team";
import GithubIcon from "./ui/GithubIcon";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import SocialIcon from "./ui/SocialIcon";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const iconLink =
  "flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent";

export default function Team({ dict }: { dict: Dictionary }) {
  const { team: t } = dict;
  const members = team.flatMap((meta) => {
    const text = t.members.find((m) => m.id === meta.id);
    return text ? [{ meta, text }] : [];
  });

  return (
    <section id="team" aria-labelledby="team-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="team-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {members.map(({ meta, text }, index) => (
            <Reveal as="li" key={meta.id} delay={index * 0.08} className="card group flex flex-col overflow-hidden">
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br sm:aspect-[4/5] from-accent/25 via-accent/5 to-transparent">
                {meta.photo ? (
                  <Image
                    src={meta.photo}
                    alt={`${t.photoAlt}: ${text.name}`}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
                    <span className="text-gradient-accent relative text-7xl font-extrabold tracking-tight sm:text-8xl">{initials(text.name)}</span>
                  </div>
                )}
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg-elevated to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <span className="self-start rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold tracking-wide text-accent-soft">
                  {text.role}
                </span>
                <h3 className="mt-4 text-2xl font-bold tracking-tight">{text.name}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{text.bio}</p>

                <div className="mt-auto flex gap-2 pt-6">
                  {meta.github ? (
                    <a href={meta.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub: ${text.name}`} className={iconLink}>
                      <GithubIcon className="h-5 w-5" />
                    </a>
                  ) : null}
                  {meta.instagram ? (
                    <a href={meta.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram: ${text.name}`} className={iconLink}>
                      <SocialIcon network="instagram" className="h-5 w-5" />
                    </a>
                  ) : null}
                  {meta.telegram ? (
                    <a href={meta.telegram} target="_blank" rel="noopener noreferrer" aria-label={`Telegram: ${text.name}`} className={iconLink}>
                      <SocialIcon network="telegram" className="h-5 w-5" />
                    </a>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
