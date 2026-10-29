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
    <section id="team" data-chapter="stone" aria-labelledby="team-title" className="relative px-m pb-[40svh]">
      <div className="pointer-events-none sticky top-0 z-20 flex h-[100svh] items-start justify-center pt-20 lg:items-center lg:pt-0">
        <h2 id="team-title" className="t-display text-center text-[clamp(56px,13vw,200px)] text-[#a4471c]">
          {t.short}
        </h2>
      </div>

      <div className="relative z-10 -mt-[100svh]">
        <Reveal className="max-w-[30ch] pt-[42svh] lg:pt-[14svh]">
          <p className="t-lead">{t.subtitle}</p>
        </Reveal>

        <ul className="mt-[40svh] flex flex-col gap-12 lg:mt-[30svh] lg:gap-[60svh]">
          {members.map(({ meta, text }, index) => {
            const right = index % 2 === 1;
            return (
              <li
                key={meta.id}
                className={`w-[72%] lg:w-[28vw] ${right ? "self-end lg:mr-[calc((100vw-2*var(--m))/12)]" : "lg:ml-[calc((100vw-2*var(--m))/12)]"}`}
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
