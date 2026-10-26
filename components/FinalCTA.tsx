import { Phone } from "lucide-react";
import type { Dictionary } from "@/locales";
import { botUrl, contacts } from "@/lib/site";
import Availability from "./Availability";
import LeadForm from "./LeadForm";
import ButtonLink from "./ui/ButtonLink";
import GoldShapes from "./ui/GoldShapes";
import Parallax from "./ui/Parallax";
import Wave from "./ui/Wave";
import Tilt from "./motion/Tilt";
import TelegramIcon from "./ui/TelegramIcon";

export default function FinalCTA({ dict }: { dict: Dictionary }) {
  const { finalCta } = dict;

  return (
    <>
    <Wave />
    <section id="contacts" aria-labelledby="cta-title" className="relative isolate -mt-px overflow-hidden bg-accent py-16 text-on-accent sm:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-notebook absolute inset-0 opacity-60" />
        <Parallax offset={-90} className="absolute -top-40 -left-40 h-[520px] w-[620px]">
          <div className="soft-glow h-full w-full [--glow:rgb(255_255_255/0.45)]" />
        </Parallax>
      </div>
      <GoldShapes set="cta" className="[--color-accent:#fff8e6]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <Parallax offset={28} className="text-center lg:text-left">
              <h2 id="cta-title" className="font-display text-[1.75rem] leading-[1.15] font-bold tracking-[-0.02em] text-balance sm:text-4xl lg:text-[2.75rem]">
                {finalCta.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-on-accent/80 text-pretty sm:text-lg">{finalCta.subtitle}</p>

              <div className="mt-8 flex flex-col items-center gap-5 lg:items-start">
                <ButtonLink href={botUrl("site_cta")} external variant="ink" size="lg" className="w-full sm:h-16 sm:w-auto sm:px-10 sm:text-lg">
                  <TelegramIcon className="h-6 w-6" />
                  {finalCta.button}
                </ButtonLink>
                <Availability t={dict.availability} />
                <p className="flex flex-wrap items-center justify-center gap-x-2 text-sm text-on-accent/80">
                  {finalCta.orCall}
                  <a
                    href={contacts.phoneHref}
                    className="inline-flex items-center gap-1.5 rounded font-semibold text-fg underline decoration-fg/40 underline-offset-4 hover:decoration-fg"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {contacts.phone}
                  </a>
                </p>
              </div>
            </Parallax>

            <div>
              <p className="mb-4 flex items-center gap-3 text-sm font-semibold text-on-accent/70 lg:hidden">
                <span className="h-px flex-1 bg-on-accent/25" />
                {finalCta.or}
                <span className="h-px flex-1 bg-on-accent/25" />
              </p>
              <Tilt max={4}>
                <LeadForm form={finalCta.form} />
              </Tilt>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Wave flip className="-mb-px bg-bg-elevated" />
    </>
  );
}
