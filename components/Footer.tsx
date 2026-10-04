import { Phone } from "lucide-react";
import type { Dictionary, Locale } from "@/locales";
import { contacts, SITE_NAME, socials } from "@/lib/site";
import Logo from "./Logo";
import SocialIcon from "./ui/SocialIcon";
import TelegramIcon from "./ui/TelegramIcon";
import Glow from "./ui/Glow";

type Props = { lang: Locale; dict: Dictionary };

export default function Footer({ lang, dict }: Props) {
  const { footer, nav } = dict;
  const year = new Date().getFullYear();
  const links = [
    { href: "#services", label: nav.services },
    { href: "#process", label: nav.process },
    { href: "#projects", label: nav.projects },
    { href: "#prices", label: nav.prices },
    { href: "#faq", label: nav.faq },
    { href: "#contacts", label: nav.contacts },
  ];
  const linkClass = "inline-flex items-center gap-2.5 rounded text-muted transition-colors hover:text-fg";

  return (
    <footer className="relative overflow-x-clip border-t border-line bg-bg-elevated/40 pb-28 md:pb-0">
      {/* золотая черта, светлеющая к центру */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
      <Glow className="-top-24 left-1/2 h-48 w-[640px] -translate-x-1/2 opacity-60" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="flex flex-col gap-4">
          <Logo lang={lang} label={dict.a11y.home} variant="full" />
          <p className="max-w-xs text-sm leading-relaxed text-muted">{footer.tagline}</p>
          <p className="text-sm text-muted">
            <span className="font-semibold text-fg">{footer.team}</span>
            <br />
            {footer.response}
          </p>
          <ul className="mt-2 flex gap-2" aria-label={footer.socialTitle}>
            {socials.map((social) => (
              <li key={social.network}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <SocialIcon network={social.network} className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-subtle">{footer.contactsTitle}</h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li>
              <a href={contacts.telegramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <TelegramIcon className="h-4 w-4 text-accent" />@{contacts.telegramUsername}
              </a>
            </li>
            <li>
              <a href={contacts.phoneHref} className={linkClass}>
                <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                {contacts.phone}
              </a>
            </li>
            <li>
              <a href={contacts.instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <SocialIcon network="instagram" className="h-4 w-4 text-accent" />@{contacts.instagramUsername}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-labelledby="footer-nav-title">
          <h2 id="footer-nav-title" className="text-xs font-bold uppercase tracking-[0.16em] text-subtle">
            {footer.navTitle}
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-1">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-subtle sm:px-6 lg:px-8">
          © {year} {SITE_NAME}. {footer.rights}
        </p>
      </div>
    </footer>
  );
}
