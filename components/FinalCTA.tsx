import { Phone } from "lucide-react";
import type { Dictionary } from "@/locales";
import { botUrl, contacts, type BotRef } from "@/lib/site";
import Availability from "./Availability";
import LeadForm from "./LeadForm";
import ButtonLink from "./ui/ButtonLink";
import Reveal from "./ui/Reveal";
import TelegramIcon from "./ui/TelegramIcon";

export default function FinalCTA({ dict, botRef = "site_cta" }: { dict: Dictionary; botRef?: BotRef }) {
  const { finalCta } = dict;

  return (
    <section id="contacts" aria-labelledby="cta-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-accent/25 bg-bg-elevated px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
            <div className="absolute -bottom-40 left-1/4 h-80 w-[640px] -translate-x-1/2 soft-glow [--glow:rgb(246_183_60/0.25)]" />
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div className="text-center lg:text-left">
              <h2 id="cta-title" className="text-gradient-title text-3xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-5xl">
                {finalCta.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted text-pretty sm:text-lg">{finalCta.subtitle}</p>

              <div className="mt-8 flex flex-col items-center gap-5 lg:items-start">
                <ButtonLink href={botUrl(botRef)} external size="lg" className="w-full sm:h-16 sm:w-auto sm:px-10 sm:text-lg">
                  <TelegramIcon className="h-6 w-6" />
                  {finalCta.button}
                </ButtonLink>
                <Availability t={dict.availability} />
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
            </div>

            <div>
              <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-subtle lg:hidden">
                <span className="h-px flex-1 bg-line-strong" />
                {finalCta.or}
                <span className="h-px flex-1 bg-line-strong" />
              </p>
              <LeadForm form={finalCta.form} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
