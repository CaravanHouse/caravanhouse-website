"use client";

import { useId, useState } from "react";
import type { Dictionary } from "@/locales";
import Reveal from "./ui/Reveal";

type Props = { t: Dictionary["showcase"] };

// Живая часть страницы: та самая запись на пробный урок, ради которой делается сайт, увеличенная до плаката.
// Выбор дня меняет слово в заголовке и цвет поля; кнопка показывает, какое сообщение получит администратор.
// Без скрипта видно и заголовок, и контрол (по умолчанию выбрана суббота), просто без отправки.
export default function TrialDemo({ t }: Props) {
  const id = useId();
  const [day, setDay] = useState(t.days.length - 1);
  const [sent, setSent] = useState(false);
  const current = t.days[day];
  const chapter = day % 2 === 0 ? "gold" : "terra";

  return (
    <section
      id="trial"
      data-chapter={chapter}
      aria-labelledby={`${id}-title`}
      className="relative isolate min-h-[86svh] overflow-hidden px-m pt-24 pb-10 transition-colors duration-300 sm:pt-28 md:min-h-[64svh] lg:min-h-[92svh]"
    >
      <Reveal className="relative z-10 md:max-w-[60%]">
        <h2 id={`${id}-title`} className="t-head">
          {t.title} <span aria-live="polite">{current.word}</span>
        </h2>
        <p className="t-body mt-5 max-w-[36ch]">{t.text}</p>
      </Reveal>

      {/* Сообщение, которое получает администратор: появляется после нажатия «Записаться» */}
      <div className="relative z-20 mt-8 min-h-[9.5rem] max-w-[24rem] md:absolute md:bottom-14 md:left-[var(--m)] md:mt-0">
        <p className="sr-only" aria-live="polite">
          {sent ? `${t.toastTitle}: ${current.lead}` : ""}
        </p>
        <div data-ui data-open={sent} inert={!sent} className="toast rounded-[1.25rem] bg-[#fbf5ec] p-5 text-[#24160c]">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#24160c] text-sm font-black text-[#eea72a]">
                CH
              </span>
              <div className="min-w-0">
                <p className="t-small font-extrabold">{t.toastTitle}</p>
                <p className="t-small opacity-80">{t.toastFrom}</p>
              </div>
            </div>
            <p className="t-body mt-3 font-semibold">{current.lead}</p>
            <p className="t-small mt-3">{t.sentNote}</p>
          </div>
      </div>

      {/* Контрол записи, увеличенный до плаката: размеры в em, корень data-ui */}
      <div
        data-ui
        className="trial-ui relative z-10 mt-10 w-max max-w-full text-[clamp(16px,4.2vw,22px)] md:absolute md:right-[-3vw] md:bottom-[-0.8em] md:mt-0 md:max-w-none md:text-[clamp(22px,2.8vw,40px)]"
      >
        <div className="rounded-[1.1em] bg-[#fbf5ec] p-[0.9em] text-[#24160c]">
          <fieldset>
            <legend className="mb-[0.5em] px-[0.2em] text-[0.62em] font-bold">{t.pick}</legend>
            <div className="flex gap-[0.3em] rounded-[0.8em] bg-[#efdfc6] p-[0.3em]">
              {t.days.map((d, index) => {
                const active = index === day;
                return (
                  <label
                    key={d.label}
                    className={`cursor-pointer rounded-[0.55em] px-[0.8em] py-[0.5em] text-[0.9em] font-extrabold whitespace-nowrap transition-colors duration-200 ease-[ease] has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-[#a4471c] ${
                      active ? "bg-[#24160c] text-[#fbf5ec]" : "hover:bg-[#fbf5ec]"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`${id}-day`}
                      value={index}
                      checked={active}
                      onChange={() => {
                        setDay(index);
                        setSent(false);
                      }}
                      className="sr-only"
                    />
                    {d.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
          <button
            type="button"
            onClick={() => setSent((value) => !value)}
            className="mt-[0.5em] flex h-[2.6em] w-full items-center justify-center rounded-[0.8em] bg-[#eea72a] text-[1em] font-black text-[#24160c] transition-[transform,background-color] duration-150 ease-[var(--ease-out)] hover:bg-[#f7c25e] active:scale-[0.97]"
          >
            {sent ? t.again : t.button}
          </button>
        </div>
      </div>
    </section>
  );
}
