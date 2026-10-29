import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/locales";
import { team } from "@/lib/team";
import Reveal from "./ui/Reveal";

// «Нас трое»: заголовок закреплён посередине экрана, портреты проплывают под ним по очереди слева и справа.
// Фото и имя ведут на страницу участника /<lang>/team/<id> с его лучшей работой.
export default function Team({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { team: t } = dict;
  const members = team.flatMap((meta) => {
    const text = t.members.find((m) => m.id === meta.id);
    return text ? [{ meta, text }] : [];
  });

  return (
    <section id="team" data-chapter="stone" aria-labelledby="team-title" className="grid gap-x-10 px-m py-24 sm:py-28 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <div className="md:grid md:grid-cols-2 md:items-end md:gap-10 lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:items-start lg:justify-center lg:gap-0">
          <h2 id="team-title" className="t-display text-[#a4471c]">
            {t.short}
          </h2>
          <Reveal className="mt-6 max-w-[30ch] lg:mt-8">
            <p className="t-lead">{t.subtitle}</p>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 lg:col-span-6 lg:mt-[14svh]">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 lg:gap-y-16">
          {members.map(({ meta, text }, index) => {
            const right = index % 2 === 1;
            return (
              <li
                key={meta.id}
                className={right ? "mt-[40%]" : ""}
              >
                <Link href={`/${lang}/team/${meta.id}`} className="group block" aria-label={`${text.name}: ${t.viewWork}`}>
                  <span className="relative block aspect-[4/5] overflow-hidden bg-[#e3cca9]">
                    {meta.photo ? (
                      <Image
                        src={meta.photo}
                        alt={`${t.photoAlt}: ${text.name}`}
                        fill
                        sizes="(min-width: 1024px) 28vw, 72vw"
                        placeholder="blur"
                        className="object-cover object-[50%_25%] transition-transform duration-1000 ease-[var(--ease-out)] group-hover:scale-[1.04]"
                      />
                    ) : null}
                  </span>
                </Link>
                <h3 className="mt-4 text-[18px] font-extrabold">
                  <Link href={`/${lang}/team/${meta.id}`} className="link-u decoration-transparent hover:decoration-current">
                    {text.name}
                  </Link>
                </h3>
                <p className="t-small font-bold text-[#a4471c]">{text.role}</p>
                <p className="t-body mt-2 max-w-[280px]">{text.bio}</p>
                <Link href={`/${lang}/team/${meta.id}`} className="link-u t-small mt-3 inline-block font-bold">
                  {t.viewWork} <span aria-hidden="true">→</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
