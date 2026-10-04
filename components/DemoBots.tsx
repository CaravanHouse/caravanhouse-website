import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/locales";
import { demoBots, telegramUrl, type DemoBotId } from "@/lib/site";
import focusAvatar from "@/public/bots/focus.jpg";
import quizAvatar from "@/public/bots/quiz.jpg";
import shopAvatar from "@/public/bots/shop.jpg";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import TelegramIcon from "./ui/TelegramIcon";

// Аватарки — те же, что у ботов в Telegram (скачаны со страниц t.me/<бот>)
const avatars: Record<DemoBotId, typeof shopAvatar> = { shop: shopAvatar, quiz: quizAvatar, focus: focusAvatar };
const order: DemoBotId[] = ["shop", "quiz", "focus"];

export default function DemoBots({ dict }: { dict: Dictionary }) {
  const t = dict.demoBots;
  return (
    <section id="bots" aria-labelledby="bots-title" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="bots-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-12 lg:gap-6">
          {order.map((id, index) => {
            const username = demoBots[id];
            const item = t.items[id];
            return (
              <Reveal as="li" key={id} delay={index * 0.08}>
                <a
                  href={telegramUrl(username)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group flex h-full flex-col gap-4 rounded-3xl p-6 transition-colors hover:border-accent/45"
                >
                  <span className="flex items-center gap-4">
                    <Image
                      src={avatars[id]}
                      alt=""
                      width={56}
                      height={56}
                      placeholder="blur"
                      className="h-14 w-14 shrink-0 rounded-full ring-1 ring-accent/30"
                    />
                    <span className="min-w-0 leading-tight">
                      <span className="block text-lg font-bold">{item.name}</span>
                      <span className="block truncate text-sm text-subtle">@{username}</span>
                    </span>
                  </span>
                  <span className="text-sm leading-relaxed text-muted text-pretty">{item.text}</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-1 text-sm font-semibold text-accent-soft transition-colors group-hover:text-accent">
                    <TelegramIcon className="h-4 w-4" />
                    {t.open}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
