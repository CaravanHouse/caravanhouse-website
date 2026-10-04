"use client";

import { CircleCheck, Loader2, Send } from "lucide-react";
import { useId, useState } from "react";
import type { Dictionary } from "@/locales";

type Form = Dictionary["finalCta"]["form"];
type Service = keyof Form["services"];
type Phase = { name: "idle" } | { name: "sending" } | { name: "done"; id: number | null } | { name: "error"; message: string };

const field =
  "w-full rounded-xl border border-line-strong bg-bg/60 px-4 py-3 text-base text-fg placeholder:text-subtle transition-colors focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20";

// Форма заявки: уходит на /api/lead → бот @CaravanHousebot → группа «Заказы» с голосованием
export default function LeadForm({ form }: { form: Form }) {
  const id = useId();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [service, setService] = useState<Service>("bot");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // ловушка для ботов
  const [phase, setPhase] = useState<Phase>({ name: "idle" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) return setPhase({ name: "error", message: form.errorName });
    if (contact.trim().length < 5) return setPhase({ name: "error", message: form.errorContact });
    setPhase({ name: "sending" });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, service, message, website }),
      });
      const data = (await res.json().catch(() => ({}))) as { id?: number | null; error?: string };
      if (res.ok) return setPhase({ name: "done", id: data.id ?? null });
      const text =
        data.error === "name" ? form.errorName : data.error === "contact" ? form.errorContact : res.status === 429 ? form.errorRate : form.errorFailed;
      setPhase({ name: "error", message: text });
    } catch {
      setPhase({ name: "error", message: form.errorFailed });
    }
  }

  if (phase.name === "done") {
    return (
      <div role="status" className="flex h-full flex-col items-center justify-center gap-4 rounded-3xl border border-emerald-400/25 bg-emerald-400/10 p-8 text-center">
        <CircleCheck className="h-10 w-10 text-emerald-300" aria-hidden="true" />
        <p className="text-lg font-semibold text-emerald-100">
          {phase.id ? form.success.replace("{id}", String(phase.id)) : form.successNoId}
        </p>
      </div>
    );
  }

  const sending = phase.name === "sending";
  return (
    <form onSubmit={submit} noValidate className="relative flex flex-col gap-4 rounded-3xl border border-line-strong bg-bg/50 p-6 text-left backdrop-blur sm:p-7">
      <p className="text-xl font-bold tracking-tight">{form.title}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor={`${id}-name`} className="flex flex-col gap-2 text-sm text-muted">
          {form.name}
          <input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} placeholder={form.namePlaceholder} autoComplete="name" maxLength={60} required className={field} />
        </label>
        <label htmlFor={`${id}-contact`} className="flex flex-col gap-2 text-sm text-muted">
          {form.contact}
          <input id={`${id}-contact`} value={contact} onChange={(e) => setContact(e.target.value)} placeholder={form.contactPlaceholder} autoComplete="tel" inputMode="tel" maxLength={80} required className={field} />
        </label>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm text-muted">{form.service}</legend>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(form.services) as Service[]).map((key) => (
            <label
              key={key}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
                service === key ? "border-accent/60 bg-accent/15 text-accent-soft" : "border-line-strong text-muted hover:text-fg"
              }`}
            >
              <input type="radio" name={`${id}-service`} value={key} checked={service === key} onChange={() => setService(key)} className="sr-only" />
              {form.services[key]}
            </label>
          ))}
        </div>
      </fieldset>

      <label htmlFor={`${id}-message`} className="flex flex-col gap-2 text-sm text-muted">
        {form.message}
        <textarea id={`${id}-message`} value={message} onChange={(e) => setMessage(e.target.value)} rows={3} maxLength={1000} className={`${field} resize-y`} />
      </label>

      {/* Ловушка для ботов: скрыта от людей и скринридеров */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} name="website" />
        </label>
      </div>

      {phase.name === "error" ? (
        <p role="alert" className="text-sm text-[#ff9b8f]">
          {phase.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-on-accent transition-colors hover:bg-accent-soft disabled:opacity-70"
      >
        {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
        {sending ? form.sending : form.submit}
      </button>
      <p className="text-xs leading-relaxed text-subtle">{form.consent}</p>
    </form>
  );
}
