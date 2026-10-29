import Image from "next/image";
import type { Dictionary } from "@/locales";
import { eduDemo, otherDemos } from "@/lib/projects";
import clinicShot from "@/public/projects/clinic.jpg";
import storeShot from "@/public/projects/store.jpg";
import Reveal from "./ui/Reveal";

type Props = { dict: Dictionary };

const shots = { clinic: clinicShot, store: storeShot } as const;

// Что будет на сайте: крупный простой список блоков, а в конце — живой демо-сайт и другие наши сайты.
export default function SiteShowcase({ dict }: Props) {
  const t = dict.site;
  return (
    <section id="site" data-chapter="sand" aria-labelledby="site-title" className="px-m py-28 sm:py-40">
      <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <h2 id="site-title" className="t-head">
            {t.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
          <p className="t-lead">{t.subtitle}</p>
        </Reveal>
      </div>

      <ul className="mt-16 sm:mt-24">
        {t.modules.map((module, index) => (
          <li key={module.id} className="grid gap-x-10 gap-y-3 py-7 even:bg-[#f6ecdc] even:-mx-[var(--m)] even:px-[var(--m)] sm:py-9 lg:grid-cols-12 lg:items-baseline">
            <Reveal delay={index * 0.05} className="lg:col-span-7">
              <h3 className="t-head text-[clamp(28px,3vw,48px)]">{module.title}</h3>
            </Reveal>
            <Reveal delay={index * 0.05 + 0.06} className="lg:col-span-5">
              <p className="t-body max-w-[46ch]">{module.text}</p>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mt-20 grid gap-10 sm:mt-28 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-5">
          <h3 className="t-head">{t.demoTitle}</h3>
          <p className="t-body mt-5 max-w-[44ch]">{t.demoText}</p>
          <a href={eduDemo.url} target="_blank" rel="noopener noreferrer" className="btn btn-night mt-8">
            {t.demoCta}
            <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
        <div className="lg:col-span-7">
          <p className="t-small font-bold">{t.othersTitle}</p>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {otherDemos.map((demo, index) => (
              <li key={demo.id}>
                <Reveal delay={index * 0.08}>
                  <a href={demo.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <span className="block overflow-hidden rounded-[var(--radius)]">
                      <Image
                        src={shots[demo.id]}
                        alt=""
                        sizes="(min-width: 1024px) 28vw, 45vw"
                        className="h-auto w-full transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
                      />
                    </span>
                    <span className="t-body mt-3 inline-block font-bold group-hover:underline">
                      {t.others[demo.id]} <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
