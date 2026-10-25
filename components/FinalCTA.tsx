import { Phone } from "lucide-react";
import type { Dictionary } from "@/locales";
import { botUrl, contacts } from "@/lib/site";
import Availability from "./Availability";
import LeadForm from "./LeadForm";
import ButtonLink from "./ui/ButtonLink";
import TelegramIcon from "./ui/TelegramIcon";

export default function FinalCTA({ dict }: { dict: Dictionary }) {
  const { finalCta } = dict;

  return (
    <section id="contacts" aria-labelledby="cta-title" className="scope-dark py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div className="text-center lg:text-left">
              <h2 id="cta-title" className="font-display text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.02em] text-balance sm:text-4xl lg:text-[2.75rem]">
                {finalCta.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted text-pretty sm:text-lg">{finalCta.subtitle}</p>

              <div className="mt-8 flex flex-col items-center gap-5 lg:items-start">
                <ButtonLink href={botUrl("site_cta")} external size="lg" className="w-full sm:h-16 sm:w-auto sm:px-10 sm:text-lg">
                  <TelegramIcon className="h-6 w-6" />
                  {finalCta.button}
                </ButtonLink>
                <Availability t={dict.availability} />
                <p className="flex flex-wrap items-center justify-center gap-x-2 text-sm text-muted">
                  {finalCta.orCall}
                  <a
                    href={contacts.phoneHref}
                    className="inline-flex items-center gap-1.5 rounded font-semibold text-fg underline decoration-accent/60 underline-offset-4 hover:decoration-accent"
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
        </div>
      </div>
    </section>
  );
}
