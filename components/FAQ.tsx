"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { Dictionary } from "@/locales";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

type Props = { faq: Dictionary["faq"] };

// Ответы всегда остаются в HTML (важно для SEO) — сворачиваем их через grid-rows.
export default function FAQ({ faq }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-fade-elevated py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <Reveal>
          <SectionHeading id="faq-title" title={faq.title} />
        </Reveal>

        <ul className="border-t-2 border-accent">
          {faq.items.map((item, index) => {
            const open = openIndex === index;
            const buttonId = `${baseId}-q-${index}`;
            const panelId = `${baseId}-a-${index}`;
            return (
              <li key={item.question} className="border-b border-line">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold sm:text-lg"
                  >
                    {item.question}
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                        open ? "rotate-45 border-accent bg-accent text-on-accent" : "border-line-strong text-muted"
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
                  <div className="overflow-hidden" inert={!open}>
                    <p className="max-w-2xl pb-6 leading-relaxed text-muted">{item.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
