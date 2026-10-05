"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/locales";

// Рабочие часы команды по Ташкенту (UTC+5, без перехода на летнее время)
const OPEN_HOUR = 9;
const CLOSE_HOUR = 21;

type State = "online" | "beforeOpen" | "afterClose";

function tashkentState(now = new Date()): State {
  const hour = (now.getUTCHours() + 5) % 24;
  if (hour < OPEN_HOUR) return "beforeOpen";
  if (hour >= CLOSE_HOUR) return "afterClose";
  return "online";
}

/** «Сейчас на связи» / «ответим с 09:00» — по ташкентскому времени, а не по часам посетителя */
export default function Availability({
  t,
  className = "text-center text-balance lg:text-left",
}: {
  t: Dictionary["availability"];
  className?: string;
}) {
  // время известно только в браузере: до этого место занято, чтобы блок не прыгал
  const [state, setState] = useState<State | null>(null);
  useEffect(() => {
    const update = () => setState(tashkentState());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const online = state === "online";
  return (
    <p className={`min-h-5 text-sm text-muted ${className}`} aria-live="polite">
      {state ? (
        <>
          <span className="relative mr-2 inline-flex h-2.5 w-2.5 align-middle" aria-hidden="true">
            {online ? <span className="animate-ping-slow absolute inset-0 rounded-full bg-emerald-400" /> : null}
            <span className={`relative h-2.5 w-2.5 rounded-full ${online ? "bg-emerald-400" : "bg-subtle"}`} />
          </span>
          {t[state]}
        </>
      ) : null}
    </p>
  );
}
