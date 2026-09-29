"use client";

import { useEffect, useState } from "react";
import { contacts } from "@/lib/site";
import TelegramIcon from "./ui/TelegramIcon";

// Плавающая кнопка для мобильных: появляется, когда пользователь пролистал hero.
export default function FloatingTelegram({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={contacts.telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
      className={`fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-on-accent shadow-[0_12px_40px_-8px_rgb(246_183_60/0.7)] transition-all duration-300 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span aria-hidden="true" className="animate-ping-slow absolute inset-0 rounded-full bg-accent" />
      <TelegramIcon className="relative h-7 w-7" />
    </a>
  );
}
