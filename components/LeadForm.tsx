"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { Dictionary } from "@/locales";

type Form = Dictionary["finalCta"]["form"];
type Phase = { name: "idle" } | { name: "sending" } | { name: "done"; id: number | null } | { name: "error"; message: string; field?: "name" | "contact" };

// Ячейка полосы: заливка на тон светлее поля, при фокусе — самый светлый тон
const cell =
  "flex h-[60px] flex-col justify-center rounded-[20px] bg-[#f7c25e] px-5 transition-colors duration-200 focus-within:bg-[#fbf5ec] focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-[#24160c] has-[[aria-invalid=true]]:bg-[#fbe2c4] sm:h-24";
const input = "w-full bg-transparent text-[18px] font-semibold text-[#24160c] placeholder:text-[#24160c]/75 focus:outline-none";

// Форма заявки одной полосой из трёх ячеек: имя, контакт, отправка. Уходит на /api/lead → бот @CaravanHousebot → группа «Заказы» с голосованием
export default function LeadForm({ form }: { form: Form }) {
  const id = useId();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState(""); // ловушка для ботов
  const [phase, setPhase] = useState<Phase>({ name: "idle" });
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const errorId = `${id}-error`;
  const fieldError = phase.name === "error" ? phase.field : undefined;

  // Фокус для клавиатуры и скринридера: к полю с ошибкой или на сообщение об успехе
  useEffect(() => {
    if (phase.name === "done") doneRef.current?.focus();
    if (phase.name === "error" && phase.field === "name") nameRef.current?.focus();
    if (phase.name === "error" && phase.field === "contact") contactRef.current?.focus();
    // ошибка сервера или сети: кнопка была disabled и фокус потерялся — переводим его на сообщение
    if (phase.name === "error" && !phase.field) errorRef.current?.focus();
  }, [phase]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) return setPhase({ name: "error", message: form.errorName, field: "name" });
    if (contact.trim().length < 5) return setPhase({ name: "error", message: form.errorContact, field: "contact" });
    setPhase({ name: "sending" });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // услугу и подробности уточняем на созвоне: так форма короче
        body: JSON.stringify({ name, contact, service: "site", message: "", website }),
      });
      const data = (await res.json().catch(() => ({}))) as { id?: number | null; error?: string };
      if (res.ok) return setPhase({ name: "done", id: data.id ?? null });
      if (data.error === "name") return setPhase({ name: "error", message: form.errorName, field: "name" });
      if (data.error === "contact") return setPhase({ name: "error", message: form.errorContact, field: "contact" });
      setPhase({ name: "error", message: res.status === 429 ? form.errorRate : form.errorFailed });
    } catch {
      setPhase({ name: "error", message: form.errorFailed });
    }
  }

  if (phase.name === "done") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="rounded-[20px] bg-[#fbf5ec] p-7 text-[#24160c] outline-none sm:p-9">
        <p className="t-lead font-extrabold">
          {phase.id ? form.success.replace("{id}", String(phase.id)) : form.successNoId}
        </p>
      </div>
    );
  }

  const sending = phase.name === "sending";
  return (
    <form onSubmit={submit} noValidate aria-label={form.title} className="relative">
      <div className="grid gap-2 sm:grid-cols-3">
        <label htmlFor={`${id}-name`} className={cell}>
          <span className="t-small font-bold text-[#24160c]">{form.name}</span>
          <input
            ref={nameRef}
            id={`${id}-name`}
            aria-invalid={fieldError === "name"}
            aria-describedby={fieldError === "name" ? errorId : undefined}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={form.namePlaceholder}
            autoComplete="name"
            maxLength={60}
            required
            className={input}
          />
        </label>
        <label htmlFor={`${id}-contact`} className={cell}>
          <span className="t-small font-bold text-[#24160c]">{form.contact}</span>
          <input
            ref={contactRef}
            id={`${id}-contact`}
            aria-invalid={fieldError === "contact"}
            aria-describedby={fieldError === "contact" ? errorId : undefined}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={form.contactPlaceholder}
            autoComplete="tel"
            maxLength={80}
            required
            className={input}
          />
        </label>
        <button
          type="submit"
          disabled={sending}
          className="flex h-[60px] items-center justify-center gap-2 rounded-[20px] bg-[#24160c] text-[18px] font-extrabold text-[#fbf5ec] transition-[background-color,transform] duration-150 ease-[var(--ease-out)] hover:bg-[#3a2617] active:scale-[0.97] disabled:opacity-80 sm:h-24"
        >
          {sending ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : null}
          {sending ? form.sending : form.submit}
        </button>
      </div>

      {/* Ловушка для ботов: скрыта от людей и скринридеров */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} name="website" />
        </label>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <p className="t-small">{form.consent}</p>
        {phase.name === "error" ? (
          <p ref={errorRef} id={errorId} tabIndex={-1} role="alert" className="t-small font-bold outline-none sm:col-start-3">
            {phase.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
