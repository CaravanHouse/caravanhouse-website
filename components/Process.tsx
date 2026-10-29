import type { Dictionary } from "@/locales";
import Reveal from "./ui/Reveal";

type Props = { dict: Dictionary };

// Четыре поля встык, в каждом — одна и та же карточка проекта, с каждым шагом она дальше.
const chapters = ["gold", "sand", "night", "terra"] as const;

export default function Process({ dict }: Props) {
  const { title, steps } = dict.process;
  return (
    <section id="process" aria-labelledby="process-title" className="grid md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <div
          key={step.title}
          data-chapter={chapters[index]}
          className="group relative flex flex-col px-[20px] pt-16 pb-14 lg:min-h-[84svh] lg:px-7 lg:pt-28 lg:pb-8"
        >
          {index === 0 ? (
            <h2 id="process-title" className="t-lead mb-6 font-black lg:absolute lg:top-24 lg:left-7 lg:mb-0">
              {title}
            </h2>
          ) : null}

          <p className="t-lead order-1 font-extrabold lg:order-2 lg:mt-auto">{step.clause}</p>

          <Reveal delay={index * 0.08} className="order-2 mt-8 lg:order-1 lg:mx-auto lg:mt-[22svh] lg:mb-10">
            <div
              data-ui
              className="w-[260px] rounded-[18px] bg-[#fbf5ec] p-5 text-[#24160c] transition-transform duration-150 group-hover:-translate-y-1.5 [[data-chapter=sand]_&]:bg-[#efdfc6]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[15px] font-black">{step.title}</p>
                <p className="text-[13px] font-bold tabular-nums">
                  {index + 1}/{steps.length}
                </p>
              </div>
              <div aria-hidden="true" className="mt-3 flex gap-1">
                {steps.map((s, i) => (
                  <span key={s.title} className={`h-1.5 flex-1 rounded-full ${i <= index ? "bg-[#a4471c]" : "bg-[#24160c]/15"}`} />
                ))}
              </div>
              <p className="mt-4 text-[14px] leading-[1.45]">{step.description}</p>
            </div>
          </Reveal>
        </div>
      ))}
    </section>
  );
}
