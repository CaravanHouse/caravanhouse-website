import { Phone } from "lucide-react";
import type { ReactNode } from "react";
import type { Dictionary, Locale } from "@/locales";
import { botUrl, contacts, SITE_NAME, socials } from "@/lib/site";
import Availability from "./Availability";
import Logo from "./Logo";
import ButtonLink from "./ui/ButtonLink";
import SocialIcon from "./ui/SocialIcon";
import TelegramIcon from "./ui/TelegramIcon";
import Glow from "./ui/Glow";

type Props = { lang: Locale; dict: Dictionary };

const headingClass = "text-xs font-bold uppercase tracking-[0.18em] text-accent";
const linkClass = "rounded text-muted transition-colors hover:text-fg";

// Строка контакта: иконка в золотой плашке + текст
function ContactLink({ href, external, icon, children }: { href: string; external?: boolean; icon: ReactNode; children: ReactNode }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group inline-flex items-center gap-3 rounded text-muted transition-colors hover:text-fg"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/[0.07] text-accent transition-colors group-hover:border-accent/45">
        {icon}
      </span>
      {children}
    </a>
  );
}

export default function Footer({ lang, dict }: Props) {
  const { footer, nav, services } = dict;
  const year = new Date().getFullYear();
  const links = [
    { href: "#services", label: nav.services },
    { href: "#process", label: nav.process },
    { href: "#projects", label: nav.projects },
    { href: "#prices", label: nav.prices },
    { href: "#faq", label: nav.faq },
    { href: "#contacts", label: nav.contacts },
  ];

  return (
    <footer className="relative overflow-x-clip border-t border-line bg-bg-elevated/40 pb-28 md:pb-0">
      {/* золотая черта, светлеющая к центру */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
      <Glow className="-top-24 left-1/2 h-48 w-[640px] -translate-x-1/2 opacity-60" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* На телефоне: бренд, затем «Услуги» и «Навигация» в две колонки, затем контакты. С lg — четыре колонки */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-[1.4fr_1fr_0.8fr_1.3fr] lg:gap-x-10 lg:py-16">
          <div className="col-span-2 flex flex-col items-start gap-5 lg:col-span-1">
            <Logo lang={lang} label={dict.a11y.home} variant="full" />
            <p className="max-w-xs text-sm leading-relaxed text-muted text-pretty">{footer.tagline}</p>
            <ButtonLink href={contacts.channelUrl} external variant="outline" size="md">
              <SocialIcon network="channel" className="h-4 w-4" />
              {dict.cta.channel}
            </ButtonLink>
          </div>

          <nav aria-labelledby="footer-services-title">
            <h2 id="footer-services-title" className={headingClass}>
              {footer.servicesTitle}
            </h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {services.items.map((service) => (
                <li key={service.id}>
                  <a href="#services" className={linkClass}>
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-nav-title">
            <h2 id="footer-nav-title" className={headingClass}>
              {footer.navTitle}
            </h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-1">
            <h2 className={headingClass}>{footer.contactsTitle}</h2>
            <ul className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-1">
              <li>
                <ContactLink href={botUrl("site_footer")} external icon={<TelegramIcon className="h-4 w-4" />}>
                  @{contacts.telegramUsername}
                </ContactLink>
              </li>
              <li>
                <ContactLink href={contacts.channelUrl} external icon={<SocialIcon network="channel" className="h-4 w-4" />}>
                  @{contacts.channelUsername}
                </ContactLink>
              </li>
              <li>
                <ContactLink href={contacts.phoneHref} icon={<Phone className="h-4 w-4" aria-hidden="true" />}>
                  {contacts.phone}
                </ContactLink>
              </li>
              <li>
                <ContactLink href={contacts.instagramUrl} external icon={<SocialIcon network="instagram" className="h-4 w-4" />}>
                  @{contacts.instagramUsername}
                </ContactLink>
              </li>
            </ul>
            <div className="mt-6 rounded-2xl border border-line bg-white/[0.02] px-4 py-3">
              <p className="text-sm font-semibold">{footer.team}</p>
              <Availability t={dict.availability} className="mt-1 text-left" />
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start gap-4 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-subtle">
            © {year} {SITE_NAME}. {footer.rights}
          </p>
          <ul className="flex gap-2" aria-label={footer.socialTitle}>
            {socials.map((social) => (
              <li key={social.network}>
                <a
                  href={social.network === "telegram" ? botUrl("site_footer") : social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <SocialIcon network={social.network} className="h-4.5 w-4.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
