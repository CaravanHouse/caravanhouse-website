"use client";

import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/locales";
import { botUrl, contacts } from "@/lib/site";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import ButtonLink from "./ui/ButtonLink";
import SocialIcon from "./ui/SocialIcon";
import TelegramIcon from "./ui/TelegramIcon";

// В клиентский компонент передаём только нужные части словаря — меньше данных в HTML.
type Props = { lang: Locale; dict: Pick<Dictionary, "nav" | "a11y" | "cta"> };

export default function Header({ lang, dict }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#services", label: dict.nav.services },
    { href: "#process", label: dict.nav.process },
    { href: "#projects", label: dict.nav.projects },
    { href: "#prices", label: dict.nav.prices },
    { href: "#faq", label: dict.nav.faq },
    { href: "#contacts", label: dict.nav.contacts },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Пока открыто мобильное меню: блокируем прокрутку и закрываем по Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? "border-b border-accent/20 bg-bg/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Logo lang={lang} label={dict.a11y.home} />

        <nav aria-label={dict.a11y.mainNav} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/[0.04] hover:text-fg xl:px-4"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher lang={lang} label={dict.a11y.language} className="hidden sm:block" />
          <div className="hidden items-center gap-2 md:flex">
            <ButtonLink href={contacts.channelUrl} external variant="outline" size="md" className="whitespace-nowrap" aria-label={dict.cta.channel}>
              <SocialIcon network="channel" className="h-4 w-4" />
              {dict.cta.channelShort}
            </ButtonLink>
            <ButtonLink href={botUrl("site_header")} external size="md" className="whitespace-nowrap">
              <TelegramIcon className="h-4 w-4" />
              {dict.cta.telegram}
            </ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.a11y.closeMenu : dict.a11y.openMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/[0.03] text-fg transition-colors hover:bg-white/[0.08] xl:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto lg:h-[calc(100dvh-5rem)] border-t border-line bg-bg/95 backdrop-blur-xl xl:hidden"
          >
            <div className="mx-auto flex h-full max-w-7xl flex-col px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 sm:px-6">
              <nav aria-label={dict.a11y.mainNav}>
                <ul className="flex flex-col">
                  {links.map((link) => (
                    <li key={link.href} className="border-b border-line">
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between py-4 text-2xl font-bold tracking-tight text-fg"
                      >
                        {link.label}
                        <span aria-hidden="true" className="text-accent">
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto flex flex-col gap-4 pt-8">
                <LanguageSwitcher lang={lang} label={dict.a11y.language} className="self-start sm:hidden" />
                <ButtonLink href={contacts.channelUrl} external variant="outline" size="lg" className="w-full">
                  <SocialIcon network="channel" className="h-5 w-5" />
                  {dict.cta.channel}
                </ButtonLink>
                <ButtonLink href={botUrl("site_header")} external size="lg" className="w-full">
                  <TelegramIcon className="h-5 w-5" />
                  {dict.cta.telegram}
                </ButtonLink>
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
