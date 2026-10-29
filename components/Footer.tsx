import type { Dictionary, Locale } from "@/locales";
import { botUrl, contacts, SITE_NAME, socials } from "@/lib/site";
import Availability from "./Availability";
import TelegramIcon from "./ui/TelegramIcon";

// onHome = false — подвал на внутренней странице: якоря ведут на главную
type Props = { lang: Locale; dict: Dictionary; onHome?: boolean };

// Название, собранное из блоков: каждая буква выбита в своём прямоугольнике, блоки разной высоты стоят на одной линии.
const WORD = "CARAVANHOUSE";
const blockFills = ["#eea72a", "#a4471c", "#efdfc6", "#eea72a", "#fbf5ec", "#a4471c"];
const blockHeights = [100, 78, 90, 66, 96, 72, 84, 100, 70, 92, 80, 98];

function BlockMark() {
  return (
    <div aria-hidden="true" className="flex h-[22svh] items-end gap-1 sm:h-[34svh]">
      {WORD.split("").map((letter, index) => (
        <div
          key={index}
          className="flex flex-1 items-end justify-center overflow-hidden rounded-t-[10px] pb-[0.06em] text-[clamp(28px,7.4vw,120px)] leading-none font-black"
          style={{ height: `${blockHeights[index]}%`, background: blockFills[index % blockFills.length], color: "#24160c" }}
        >
          {letter}
        </div>
      ))}
    </div>
  );
}

export default function Footer({ lang, dict, onHome = true }: Props) {
  const home = onHome ? "" : `/${lang}`;
  const { footer, nav } = dict;
  const year = new Date().getFullYear();
  const links = [
    { href: `${home}#problems`, label: nav.problems },
    { href: `${home}#site`, label: nav.site },
    { href: `${home}#prices`, label: nav.prices },
    { href: `${home}#process`, label: nav.process },
    { href: `${home}#faq`, label: nav.faq },
    { href: `${home}#contacts`, label: nav.contacts },
  ];

  return (
    <footer data-chapter="night" className="px-m pt-20 pb-28 md:pb-10">
      <p className="sr-only">{SITE_NAME}</p>
      <BlockMark />

      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <p className="t-body max-w-[32ch] lg:col-span-4">{footer.tagline}</p>

        <nav aria-labelledby="footer-nav-title" className="lg:col-span-4">
          <p id="footer-nav-title" className="t-small font-bold text-[#eea72a]">
            {footer.navTitle}
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px]">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link-u decoration-transparent hover:decoration-current">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <p className="t-small font-bold text-[#eea72a]">{footer.contactsTitle}</p>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li>
              <a href={contacts.phoneHref} className="link-u decoration-transparent hover:decoration-current">
                {contacts.phone}
              </a>
            </li>
            {socials.map((social) => (
              <li key={social.network}>
                <a
                  href={social.network === "telegram" ? botUrl("site_footer") : social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-u decoration-transparent hover:decoration-current"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="t-small mt-5 font-bold">{footer.team}</p>
          <Availability t={dict.availability} className="t-small mt-1 !text-[#efdfc6]" />
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
        <p className="t-small text-[#efdfc6]">
          © {year} {SITE_NAME}. {footer.rights}
        </p>
        <a href={botUrl("site_footer")} target="_blank" rel="noopener noreferrer" className="btn btn-gold min-h-11 px-5 text-[15px]">
          <TelegramIcon className="h-4 w-4" />
          {dict.cta.telegramShort}
        </a>
      </div>
    </footer>
  );
}
