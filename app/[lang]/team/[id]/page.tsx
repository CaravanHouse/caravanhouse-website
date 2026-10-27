import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ButtonLink from "@/components/ui/ButtonLink";
import GithubIcon from "@/components/ui/GithubIcon";
import Reveal from "@/components/ui/Reveal";
import SocialIcon from "@/components/ui/SocialIcon";
import TelegramIcon from "@/components/ui/TelegramIcon";
import WorkPreview from "@/components/WorkPreview";
import { getDictionary, hasLocale, locales } from "@/locales";
import { SITE_NAME, botUrl } from "@/lib/site";
import { getMember, memberIds } from "@/lib/team";

// Страница участника команды: фото, роль и лучшая работа. Открывается по клику на карточку в блоке «Команда».
// Для школьников в команде здесь нарочно нет ни возраста, ни места учёбы — только работа.

export const dynamicParams = false;

export function generateStaticParams() {
  return memberIds.map((id) => ({ id }));
}

const iconLink =
  "flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-fg/40 hover:text-fg";

function load(lang: string, id: string) {
  if (!hasLocale(lang)) return null;
  const meta = getMember(id);
  const dict = getDictionary(lang);
  const text = dict.team.members.find((m) => m.id === id);
  return meta && text ? { meta, text, dict } : null;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/team/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  const data = load(lang, id);
  if (!data) return {};
  const { text } = data;
  const title = `${text.name} — ${text.role} | ${SITE_NAME}`;
  const description = `${text.bio} ${text.work.title}.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/team/${id}`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}/team/${id}`])), "x-default": `/ru/team/${id}` },
    },
    openGraph: { title, description, url: `/${lang}/team/${id}` },
  };
}

export default async function MemberPage({ params }: PageProps<"/[lang]/team/[id]">) {
  const { lang, id } = await params;
  const data = load(lang, id);
  if (!data || !hasLocale(lang)) notFound();
  const { meta, text, dict } = data;
  const t = dict.team;

  return (
    <>
      <Header lang={lang} dict={{ nav: dict.nav, a11y: dict.a11y, cta: dict.cta }} path={`/team/${id}`} />
      <main id="main" tabIndex={-1} className="pt-28 pb-20 outline-none sm:pt-36 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href={`/${lang}#team`} className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-fg">
            <span aria-hidden="true">←</span>
            {t.backToTeam}
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
            <Reveal className="flex flex-col">
              <div className="relative aspect-[4/5] w-full max-w-[14rem] overflow-hidden rounded-[1.75rem] bg-surface sm:max-w-sm">
                {meta.photo ? (
                  <Image
                    src={meta.photo}
                    alt={`${t.photoAlt}: ${text.name}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 352px, 90vw"
                    placeholder="blur"
                    className="object-cover object-[50%_25%]"
                  />
                ) : null}
              </div>
              <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">{text.name}</h1>
              <p className="mt-1 font-semibold text-accent-ink">{text.role}</p>
              <p className="mt-3 max-w-sm leading-relaxed text-muted">{text.bio}</p>
              <div className="mt-5 flex gap-2">
                {meta.telegram ? (
                  <a href={meta.telegram} target="_blank" rel="noopener noreferrer" aria-label={`Telegram: ${text.name}`} className={iconLink}>
                    <SocialIcon network="telegram" className="h-5 w-5" />
                  </a>
                ) : null}
                {meta.instagram ? (
                  <a href={meta.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram: ${text.name}`} className={iconLink}>
                    <SocialIcon network="instagram" className="h-5 w-5" />
                  </a>
                ) : null}
                {meta.github ? (
                  <a href={meta.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub: ${text.name}`} className={iconLink}>
                    <GithubIcon className="h-5 w-5" />
                  </a>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="flex min-w-0 flex-col">
              <p className="text-sm font-bold tracking-wide text-accent-ink uppercase">{t.workTitle}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-balance sm:text-3xl">{text.work.title}</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted text-pretty">{text.work.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {text.work.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-accent-wash px-3 py-1 text-sm font-semibold text-on-accent">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <WorkPreview url={meta.work.url} shot={meta.work.shot} title={text.work.title} label={t.preview} />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={meta.work.url} external size="lg">
                  {t.openWork} <span aria-hidden="true">↗</span>
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-20 flex flex-col items-start gap-5 rounded-[1.75rem] bg-accent p-8 text-on-accent sm:mt-28 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-balance">{t.ctaTitle}</h2>
              <p className="mt-2 text-on-accent/85">{t.ctaText}</p>
            </div>
            <ButtonLink href={botUrl("site_team")} external variant="ink" size="lg" className="shrink-0">
              <TelegramIcon className="h-5 w-5" />
              {t.ctaButton}
            </ButtonLink>
          </Reveal>
        </div>
      </main>
      <Footer lang={lang} dict={dict} onHome={false} />
    </>
  );
}
