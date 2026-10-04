"use client";

import { UserPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/locales";
import { LogoMark } from "./Logo";

type Mockup = Dictionary["hero"]["mockup"];

// Сценарий переписки: [пауза перед шагом, мс]. Номер шага = индекс + 1.
// 1 печатает → 2 приветствие → 3 клиент → 4 печатает → 5 ответ → 6 время → 7 выбор → 8 печатает → 9 готово → 10 заявка
const SCRIPT = [350, 900, 1000, 500, 900, 450, 1100, 500, 900, 550];
const LAST = SCRIPT.length;
const HOLD_MS = 3800; // сколько держим готовую переписку перед повтором
const RESET_MS = 900; // пауза после затухания
const TYPING = new Set([1, 4, 8]);
const STEP = { greeting: 2, user: 3, reply: 5, slots: 6, pick: 7, confirm: 9, order: 10 } as const;
const PICKED = 1; // какое время «выбирает» клиент (14:30)

// Пузырь появляется плавно; место под него занято с самого начала, поэтому страница не прыгает
const reveal = (on: boolean) =>
  `transition-all duration-500 ease-out ${on ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-[0.97] opacity-0"}`;

export default function HeroChat({ mockup }: { mockup: Mockup }) {
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(false);
  const [still, setStill] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Без анимации для тех, кто выключил движение в системе: сразу готовая переписка
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setStill(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  // Играем, только когда чат на экране и вкладка открыта
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let visible = false;
    const update = () => setActive(visible && document.visibilityState === "visible");
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  // Шаги: 0 → 1 … → LAST → -1 (всё гаснет) → 0 → …
  useEffect(() => {
    if (still || !active) return;
    const delay = step === -1 ? RESET_MS : step === LAST ? HOLD_MS : SCRIPT[step];
    const next = step === LAST ? -1 : step + 1;
    const timer = window.setTimeout(() => setStep(next), delay);
    return () => window.clearTimeout(timer);
  }, [step, active, still]);

  const s = still ? LAST : step;
  const shown = (n: number) => s >= n;
  const typing = !still && TYPING.has(s);

  return (
    <div ref={root} aria-hidden="true" className="animate-fade-up relative mx-auto w-full max-w-sm" style={{ animationDelay: "200ms" }}>
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-accent/25 via-transparent to-[#3b5bdb]/25 blur-2xl" />
      <div className="rounded-[2rem] border border-line-strong bg-bg-elevated/90 p-2 shadow-2xl shadow-black/50">
        <div className="overflow-hidden rounded-[1.6rem] border border-line bg-[#0b1020]">
          <div className="flex items-center gap-3 border-b border-line bg-white/[0.03] px-4 py-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg ring-1 ring-line-strong">
              <LogoMark className="h-5 w-auto" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold">{mockup.botName}</p>
              <p className={`flex h-4 items-center gap-1 text-xs ${typing ? "text-accent-soft" : "text-subtle"}`}>
                {typing ? (
                  <>
                    {mockup.typing}
                    <span className="inline-flex gap-0.5">
                      {[0, 150, 300].map((d) => (
                        <span key={d} className="h-1 w-1 animate-bounce rounded-full bg-accent-soft" style={{ animationDelay: `${d}ms` }} />
                      ))}
                    </span>
                  </>
                ) : (
                  mockup.botStatus
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-[radial-gradient(circle_at_30%_20%,rgb(246_183_60/0.06),transparent_60%)] px-4 py-5 text-sm">
            <p className={`max-w-[85%] origin-bottom-left self-start rounded-2xl rounded-bl-md bg-white/[0.06] px-3.5 py-2.5 ${reveal(shown(STEP.greeting))}`}>
              {mockup.greeting}
            </p>
            <p
              className={`max-w-[85%] origin-bottom-right self-end rounded-2xl rounded-br-md bg-accent px-3.5 py-2.5 font-medium text-on-accent ${reveal(shown(STEP.user))}`}
            >
              {mockup.userMessage}
            </p>
            <div className="max-w-[90%] self-start">
              <p className={`origin-bottom-left rounded-2xl rounded-bl-md bg-white/[0.06] px-3.5 py-2.5 ${reveal(shown(STEP.reply))}`}>{mockup.botReply}</p>
              <div className={`mt-2 grid grid-cols-3 gap-2 ${reveal(shown(STEP.slots))}`}>
                {mockup.slots.map((slot, index) => {
                  const picked = index === PICKED && shown(STEP.pick);
                  return (
                    <span
                      key={slot}
                      className={`relative rounded-xl border px-2 py-2 text-center text-xs font-semibold transition-all duration-300 ${
                        picked ? "scale-95 border-accent/60 bg-accent/15 text-accent-soft" : "border-line text-muted"
                      }`}
                    >
                      {slot}
                      {/* «касание» пальцем в момент выбора */}
                      {picked && !still ? <span className="animate-ping-slow absolute inset-0 rounded-xl border border-accent/70" /> : null}
                    </span>
                  );
                })}
              </div>
            </div>
            <p
              className={`max-w-[85%] origin-bottom-left self-start rounded-2xl rounded-bl-md border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-2.5 text-emerald-200 ${reveal(shown(STEP.confirm))}`}
            >
              {mockup.confirm}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`absolute -top-7 -right-2 transition-all duration-500 ease-out sm:top-auto sm:right-auto sm:-bottom-6 sm:-left-10 ${
          shown(STEP.order) ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <div className="animate-float flex items-center gap-3 rounded-2xl border border-line-strong bg-surface/95 px-4 py-3 shadow-xl shadow-black/40 backdrop-blur">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <UserPlus className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-xs text-subtle">{mockup.orderLabel}</span>
            <span className="block text-sm font-bold">{mockup.orderValue}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
