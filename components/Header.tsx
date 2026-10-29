"use client";

import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/locales";
import { botUrl, contacts } from "@/lib/site";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import SocialIcon from "./ui/SocialIcon";
import TelegramIcon from "./ui/TelegramIcon";

// В клиентский компонент передаём только нужные части словаря — меньше данных в HTML.
// path — страница внутри языка (например, "/team/umid"): якоря меню ведут на главную, переключатель языка — на ту же страницу
type Props = { lang: Locale; dict: Pick<Dictionary, "nav" | "a11y" | "cta">; path?: string };

export default function Header({ lang, dict, path = "" }: Props) {
  const home = path ? `/${lang}` : "";
  // Глава страницы под шапкой: шапка берёт её цвет (data-chapter), на внутренних страницах — песок
  const [chapter, setChapter] = useState("sand");
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: `${home}#site`, label: dict.nav.site },
    { href: `${home}#prices`, label: dict.nav.prices },
    { href: `${home}#process`, label: dict.nav.process },
    { href: `${home}#faq`, label: dict.nav.faq },
    { href: `${home}#contacts`, label: dict.nav.contacts },
  ];

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const header = headerRef.current;
      if (!header) return;
      // точка сразу под нижним краем шапки: какое поле главы сейчас под ней
      const y = header.getBoundingClientRect().bottom - 2;
      const hit = document
        .elementsFromPoint(Math.round(window.innerWidth / 2), Math.max(0, y))
        .find((el) => !header.contains(el));
      const field = hit?.closest<HTMLElement>("[data-chapter]");
      setChapter(field?.dataset.chapter ?? "sand");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // поле может перекраситься и без прокрутки (живая запись на пробный урок)
    const observer = new MutationObserver(onScroll);
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["data-chapter"] });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, []);

  // Пока открыто мобильное меню: блокируем прокрутку, закрываем по Escape,
  // переводим фокус в меню и делаем остальную страницу inert, чтобы Tab не уходил под меню.
  useEffect(() => {
    if (!open) return;
    const header = headerRef.current;
    const toggle = toggleRef.current;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle?.focus();
    };
    const outside = Array.from(document.body.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && !!header && !el.contains(header),
    );
    outside.forEach((el) => (el.inert = true));
    // На ширине xl меню и кнопка скрыты: при повороте планшета закрываем меню, иначе страница останется заблокированной
    const desktop = window.matchMedia("(min-width: 80rem)");
    const onDesktop = () => desktop.matches && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      outside.forEach((el) => (el.inert = false));
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      data-chapter={open ? "sand" : chapter}
      className="site-header fixed inset-x-0 top-0 z-50"
    >
      <div className="flex h-16 items-center justify-between gap-4 px-m lg:h-20">
        <Logo lang={lang} label={dict.a11y.home} />

        <nav aria-label={dict.a11y.mainNav} className="hidden min-w-0 xl:block">
          <ul className="flex items-center gap-0.5 2xl:gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="link-u whitespace-nowrap px-2.5 py-2 text-[14px] font-extrabold decoration-transparent hover:decoration-current"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher lang={lang} path={path} label={dict.a11y.language} className="hidden sm:block" />
          <div className="hidden items-center gap-2 md:flex">
            <a
              href={botUrl("site_header")}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn min-h-11 px-5 text-[14px] whitespace-nowrap ${chapter === "gold" ? "btn-night" : "btn-gold"}`}
            >
              <TelegramIcon className="h-4 w-4" />
              {dict.cta.telegramShort}
            </a>
          </div>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.a11y.closeMenu : dict.a11y.openMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-current/10 transition-colors hover:bg-current/20 xl:hidden"
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
            ref={menuRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto bg-[#fbf5ec] text-[#24160c] lg:h-[calc(100dvh-5rem)] xl:hidden"
          >
            <div className="flex h-full flex-col px-m pb-[max(2rem,env(safe-area-inset-bottom))] pt-6">
              <nav aria-label={dict.a11y.mainNav}>
                <ul className="flex flex-col">
                  {links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between py-3 text-[30px] font-black tracking-tight"
                      >
                        {link.label}
                        <span aria-hidden="true" className="text-accent-ink">
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto flex flex-col gap-4 pt-8">
                <LanguageSwitcher lang={lang} path={path} label={dict.a11y.language} className="self-start sm:hidden" />
                <a href={contacts.channelUrl} target="_blank" rel="noopener noreferrer" className="btn btn-night w-full">
                  <SocialIcon network="channel" className="h-5 w-5" />
                  {dict.cta.channel}
                </a>
                <a href={botUrl("site_header")} target="_blank" rel="noopener noreferrer" className="btn btn-gold w-full">
                  <TelegramIcon className="h-5 w-5" />
                  {dict.cta.telegram}
                </a>
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
