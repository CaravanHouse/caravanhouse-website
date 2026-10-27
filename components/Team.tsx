import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/locales";
import { team } from "@/lib/team";
import GithubIcon from "./ui/GithubIcon";
import ParallaxMedia from "./motion/ParallaxMedia";
import Parallax from "./ui/Parallax";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import SocialIcon from "./ui/SocialIcon";

const iconLink =
  "flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-fg/40 hover:text-fg";

// Фото и имя ведут на страницу участника /<lang>/team/<id> с его лучшей работой
export default function Team({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { team: t } = dict;
  const members = team.flatMap((meta) => {
    const text = t.members.find((m) => m.id === meta.id);
    return text ? [{ meta, text }] : [];
  });

  return (
    <section id="team" aria-labelledby="team-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading id="team-title" title={t.title} subtitle={t.subtitle} />
        </Reveal>

        <ul className="mt-12 grid gap-8 sm:grid-cols-3 lg:mt-16 lg:gap-10">
          {members.map(({ meta, text }, index) => (
            <Parallax as="li" key={meta.id} offset={index === 1 ? -40 : 24}>
            <Reveal delay={index * 0.1} className="group grid grid-cols-[6rem_1fr] gap-x-5 sm:flex sm:flex-col">
              <Link
                href={`/${lang}/team/${meta.id}`}
                aria-label={`${text.name}: ${t.viewWork}`}
                className="relative row-span-5 block aspect-square overflow-hidden rounded-2xl bg-surface ring-4 ring-transparent transition-[box-shadow] duration-500 ease-soft group-hover:ring-accent sm:aspect-[4/5] sm:rounded-[1.5rem]"
              >
                {meta.photo ? (
                  <ParallaxMedia offset={28} className="absolute inset-0">
                  <Image
                    src={meta.photo}
                    alt={`${t.photoAlt}: ${text.name}`}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 33vw, 96px"
                    placeholder="blur"
                    className="object-cover object-[50%_25%] transition-transform duration-1000 ease-soft group-hover:scale-105"
                  />
                  </ParallaxMedia>
                ) : null}
              </Link>
              <h3 className="text-xl font-bold tracking-tight sm:mt-5">
                <Link href={`/${lang}/team/${meta.id}`} className="transition-colors hover:text-accent-ink">
                  {text.name}
                </Link>
              </h3>
              <p className="text-sm font-semibold text-accent-ink">{text.role}</p>
              <p className="mt-2 leading-relaxed text-muted">{text.bio}</p>
              <Link
                href={`/${lang}/team/${meta.id}`}
                className="mt-3 inline-flex items-center gap-1.5 self-start text-sm font-bold text-accent-ink underline decoration-accent-ink/30 underline-offset-4 transition-colors hover:decoration-accent-ink"
              >
                {t.viewWork} <span aria-hidden="true">→</span>
              </Link>
              <div className="mt-4 flex gap-2">
                {meta.telegram ? (
                  <a href={meta.telegram} target="_blank" rel="noopener noreferrer" aria-label={`Telegram: ${text.name}`} className={iconLink}>
                    <SocialIcon network="telegram" className="h-4.5 w-4.5" />
                  </a>
                ) : null}
                {meta.instagram ? (
                  <a href={meta.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram: ${text.name}`} className={iconLink}>
                    <SocialIcon network="instagram" className="h-4.5 w-4.5" />
                  </a>
                ) : null}
                {meta.github ? (
                  <a href={meta.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub: ${text.name}`} className={iconLink}>
                    <GithubIcon className="h-4.5 w-4.5" />
                  </a>
                ) : null}
              </div>
            </Reveal>
            </Parallax>
          ))}
        </ul>
      </div>
    </section>
  );
}
