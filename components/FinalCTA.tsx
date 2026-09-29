import { Phone } from "lucide-react";
import type { Dictionary } from "@/locales";
import { contacts } from "@/lib/site";
import ButtonLink from "./ui/ButtonLink";
import Reveal from "./ui/Reveal";
import TelegramIcon from "./ui/TelegramIcon";

export default function FinalCTA({ dict }: { dict: Dictionary }) {
  const { finalCta } = dict;

  return (
    <section id="contacts" aria-labelledby="cta-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-accent/25 bg-bg-elevated px-6 py-14 text-center sm:px-12 sm:py-20 lg:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
            <div className="absolute -bottom-40 left-1/2 h-80 w-[640px] -translate-x-1/2 rounded-full bg-accent/25 blur-[100px]" />
          </div>

          <h2 id="cta-title" className="mx-auto max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted text-pretty sm:text-lg">{finalCta.subtitle}</p>

          <div className="mt-10 flex flex-col items-center gap-5">
            <ButtonLink href={contacts.telegramUrl} external size="lg" className="w-full sm:h-16 sm:w-auto sm:px-10 sm:text-lg">
              <TelegramIcon className="h-6 w-6" />
              {finalCta.button}
            </ButtonLink>
            <p className="flex flex-wrap items-center justify-center gap-x-2 text-sm text-muted">
              {finalCta.orCall}
              <a
                href={contacts.phoneHref}
                className="inline-flex items-center gap-1.5 rounded font-semibold text-fg underline decoration-accent/50 underline-offset-4 hover:decoration-accent"
              >
                <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                {contacts.phone}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
