"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { Dictionary } from "@/locales";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import Glow from "./ui/Glow";

type Props = { faq: Dictionary["faq"] };

// Ответы всегда остаются в HTML (важно для SEO) — сворачиваем их через grid-rows.
export default function FAQ({ faq }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative overflow-x-clip py-20 sm:py-28">
      <Glow className="top-10 -left-32 h-[360px] w-[420px]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.title} />

        <Reveal>
          <ul className="flex flex-col gap-3">
            {faq.items.map((item, index) => {
              const open = openIndex === index;
              const buttonId = `${baseId}-q-${index}`;
              const panelId = `${baseId}-a-${index}`;
              return (
                <li
                  key={item.question}
                  className={`card overflow-hidden transition-colors duration-300 ${open ? "border-accent/30" : ""}`}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="flex w-full items-center justify-between gap-4 rounded-3xl px-5 py-5 text-left text-base font-semibold sm:px-6 sm:text-lg"
                    >
                      {item.question}
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          open ? "rotate-45 border-accent/50 bg-accent/15 text-accent" : "border-line-strong text-muted"
                        }`}
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 leading-relaxed text-muted sm:px-6">{item.answer}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
