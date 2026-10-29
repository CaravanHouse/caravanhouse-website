import Image from "next/image";
import type { Dictionary } from "@/locales";
import { eduDemo } from "@/lib/projects";
import { botUrl } from "@/lib/site";
import TelegramIcon from "./ui/TelegramIcon";

type Props = { dict: Dictionary };

// Первый экран: терракотовое поле, заголовок в две строки двумя чернилами (светлое золото и крем)
// и настоящий сайт учебного центра, приклеенный наискось в правом нижнем углу.
export default function Hero({ dict }: Props) {
  const { hero, site } = dict;
  return (
    <section
      data-chapter="terra"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-m pt-[max(15svh,6.5rem)] pb-10 sm:pb-14"
    >
      <h1 id="hero-title" className="t-display relative z-10 max-w-[13ch] sm:max-w-none">
        <span className="hero-line block text-[var(--ink-2)]">{hero.titleTop}</span>
        <span className="hero-line block" style={{ animationDelay: "90ms" }}>
          {hero.titleBottom}
        </span>
      </h1>

      <div className="relative z-10 mt-auto grid gap-10 pt-12 lg:grid-cols-12 lg:items-end">
        <div className="hero-rise lg:col-span-5" style={{ animationDelay: "180ms" }}>
          <p className="t-lead max-w-[34ch]">{hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href={botUrl("site_hero")} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              <TelegramIcon className="h-5 w-5" />
              {hero.primary}
            </a>
            <a href={eduDemo.url} target="_blank" rel="noopener noreferrer" className="link-u t-body font-bold">
              {hero.secondary}
            </a>
          </div>
        </div>
      </div>

      {/* Настоящий демо-сайт учебного центра: наш продукт, вырезан и приклеен поверх поля */}
      <figure className="pointer-events-none relative z-0 mt-12 -mr-[12vw] -mb-24 self-end lg:absolute lg:right-0 lg:bottom-0 lg:mt-0 lg:-mr-[6vw] lg:-mb-[8vw] lg:w-[54vw]">
        <div className="drift origin-bottom-left">
          <Image
            src={eduDemo.shot}
            alt={site.imageAlt}
            priority
            sizes="(min-width: 1024px) 54vw, 100vw"
            className="block h-auto w-full rounded-[var(--radius)]"
          />
        </div>
      </figure>
    </section>
  );
}
