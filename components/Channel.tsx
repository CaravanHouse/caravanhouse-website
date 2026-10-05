import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import type { Dictionary } from "@/locales";
import { contacts } from "@/lib/site";
import post10 from "@/public/channel/post-10.jpg";
import post11 from "@/public/channel/post-11.jpg";
import post12 from "@/public/channel/post-12.jpg";
import { LogoMark } from "./Logo";
import Glow from "./ui/Glow";
import Reveal from "./ui/Reveal";
import TelegramIcon from "./ui/TelegramIcon";

// Постеры из канала — каждый ведёт на свой пост. Новые посты: добавьте картинку в /public/channel и строку сюда.
const posts = [
  { id: 11, image: post11, className: "-rotate-6 -translate-x-[58%] translate-y-4 z-10" },
  { id: 10, image: post10, className: "z-20 -translate-x-1/2 -translate-y-2" },
  { id: 12, image: post12, className: "rotate-6 -translate-x-[42%] translate-y-4 z-10" },
];

export default function Channel({ dict }: { dict: Dictionary }) {
  const t = dict.channel;
  return (
    <section id="channel" aria-labelledby="channel-title" className="relative overflow-x-clip py-20 sm:py-28">
      <Glow strong className="top-1/2 right-0 h-[480px] w-[640px] -translate-y-1/2" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-accent/30 bg-bg-elevated">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_70%)]" />
            <div className="absolute top-1/2 right-[15%] h-96 w-96 -translate-y-1/2 rounded-full bg-accent/15 blur-[110px]" />
          </div>

          <div className="grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:p-14">
            <div className="order-2 lg:order-1">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                <span aria-hidden="true" className="h-px w-6 bg-accent/70" />
                {t.eyebrow}
              </p>
              <h2 id="channel-title" className="text-gradient-title mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-5xl">
                {t.title}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg">{t.subtitle}</p>

              <ul className="mt-6 flex flex-col gap-3">
                {t.points.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <a
                href={contacts.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 flex max-w-md flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-accent/40 bg-accent/[0.07] p-3 sm:pr-5 transition-colors hover:border-accent/70 hover:bg-accent/[0.12]"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-bg ring-1 ring-line-strong">
                  <LogoMark className="h-7 w-auto" />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block font-bold">CaravanHouse</span>
                  <span className="block text-sm text-muted">@{contacts.channelUsername}</span>
                </span>
                <span className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent transition-colors group-hover:bg-accent-soft sm:w-auto">
                  <TelegramIcon className="h-4 w-4" />
                  {t.cta}
                  <ArrowUpRight className="h-4 w-4 sm:hidden" aria-hidden="true" />
                </span>
              </a>
            </div>

            {/* Постеры веером: каждый открывает свой пост в канале */}
            <ul className="relative order-1 mx-auto aspect-[3/2] w-full max-w-[520px] lg:order-2 lg:aspect-auto lg:h-[460px]">
              {posts.map((post) => (
                <li key={post.id} className={`absolute top-0 left-1/2 w-[46%] transition-transform duration-500 hover:z-30 hover:-translate-y-3 ${post.className}`}>
                  <a
                    href={`${contacts.channelUrl}/${post.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.openPost}
                    className="block overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/60 ring-1 ring-black/40"
                  >
                    <Image
                      src={post.image}
                      alt={t.postAlt}
                      sizes="(min-width: 1024px) 240px, (min-width: 640px) 240px, 46vw"
                      placeholder="blur"
                      className="aspect-[4/5] h-auto w-full object-cover object-top"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
