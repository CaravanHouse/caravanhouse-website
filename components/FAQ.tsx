"use client";

import { useId, useState } from "react";
import type { Dictionary } from "@/locales";
import Reveal from "./ui/Reveal";

type Props = { faq: Dictionary["faq"] };

// Вопросы разложены как карточки в ящике картотеки: у каждой ярлык с темой, ярлыки идут лесенкой.
// Ответы всегда остаются в HTML (важно для SEO); закрытые помечены inert, чтобы их не читал скринридер.
const fills = ["#eea72a", "#efdfc6", "#a4471c"] as const;
const inks = ["#24160c", "#24160c", "#fbf5ec"] as const;

export default function FAQ({ faq }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" data-chapter="sand" aria-labelledby="faq-title" className="px-m py-28 sm:py-40">
      <div className="lg:mx-[calc((100vw-2*var(--m))/12*2)]">
        <Reveal>
          <h2 id="faq-title" className="t-head">
            {faq.title}
          </h2>
        </Reveal>

        <ul className="mt-14">
          {faq.items.map((item, index) => {
            const open = openIndex === index;
            const buttonId = `${baseId}-q-${index}`;
            const panelId = `${baseId}-a-${index}`;
            const fill = fills[index % fills.length];
            const ink = inks[index % inks.length];
            const step = index % 5;
            return (
              <li key={item.question} className="relative -mt-5 first:mt-0" style={{ zIndex: index + 1 }}>
                <div
                  aria-hidden="true"
                  className="faq-tab flex h-10 w-[120px] items-center rounded-t-[16px] px-4 text-[15px] font-extrabold sm:w-[200px] sm:text-[16px]"
                  style={{ background: fill, color: ink, marginLeft: `calc(${step} * var(--tab-step))` }}
                >
                  <span className="truncate">{item.topic}</span>
                </div>
                <div className="rounded-[var(--radius)] rounded-tl-none" style={{ background: fill, color: ink }}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="flex w-full items-center justify-between gap-6 px-5 pt-3 pb-7 text-left text-[18px] leading-snug font-semibold sm:px-7 sm:text-[20px]"
                    >
                      {item.question}
                      <span aria-hidden="true" className={`text-[28px] leading-none font-black transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
                        +
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
                      <p className="max-w-[50ch] px-5 pb-10 text-[16px] leading-[1.55] sm:px-7 sm:text-[18px]">{item.answer}</p>
                    </div>
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
