// Единое место для контактов и общих настроек сайта.
// Всё, что видит пользователь как текст, лежит в /locales.

export const SITE_URL = "https://caravanhouse.uz";
export const SITE_NAME = "CaravanHouse";

export const contacts = {
  // Все кнопки «Написать в Telegram» ведут в бота заявок, а не в личный аккаунт.
  telegramUsername: "CaravanHousebot",
  telegramUrl: "https://t.me/CaravanHousebot",
  // TODO: проверьте номер телефона.
  phone: "+998 99 203 07 09",
  phoneHref: "tel:+998992030709",
  // TODO: при желании замените на корпоративную почту (например, hello@caravanhouse.uz).
  email: "umidbahromov400@gmail.com",
  emailHref: "mailto:umidbahromov400@gmail.com",
  // Telegram-канал компании (новости, проекты) — отдельно от бота заявок
  channelUsername: "caravanhouse_uz",
  channelUrl: "https://t.me/caravanhouse_uz",
  instagramUsername: "caravanhouse.uz",
  instagramUrl: "https://www.instagram.com/caravanhouse.uz/",
} as const;

// Метка источника в ссылке на бота заявок: t.me/CaravanHousebot?start=<метка>.
// Бот сохраняет её в заявке («Источник» в карточке заказа) и считает в /stats — видно, какая кнопка приводит клиентов.
// Метки для ссылок вне сайта (reels, channel, channel_<пост>) — в content/channel-plan.md.
export type BotRef =
  | "site_header"
  | "site_footer"
  | "site_hero"
  | "site_cta"
  | "site_float"
  | "site_projects"
  | "site_prices"
  | "site_404"
  | "site_edu";

export const botUrl = (ref: BotRef) => `${contacts.telegramUrl}?start=${ref}`;

// Демо-боты — живые примеры, работают на Railway (проект caravanhouse-demos)
export const demoBots = {
  shop: "caravanhouse_shop_bot",
  quiz: "caravanhouse_quiz_bot",
  focus: "caravanhouse_focus_tree_bot",
} as const;

export type DemoBotId = keyof typeof demoBots;

export const telegramUrl = (username: string) => `https://t.me/${username}`;

// Демо для учебных центров: сайт (персональные демо — /<язык>/p/<slug>) и бот записи на пробный урок.
// trialBot — имя бота без @, пока бот не создан в BotFather, кнопка показывает «скоро»
export const eduDemo = {
  site: "https://edu.caravanhouse.uz",
  trialBot: null as string | null,
};

export type SocialNetwork = "telegram" | "channel" | "instagram" | "github" | "linkedin";

// Иконка для linkedin тоже готова в components/ui/SocialIcon.tsx — достаточно раскомментировать строку.
export const socials: { network: SocialNetwork; label: string; href: string }[] = [
  { network: "telegram", label: "Telegram", href: contacts.telegramUrl },
  { network: "channel", label: "Telegram-канал", href: contacts.channelUrl },
  { network: "instagram", label: "Instagram", href: contacts.instagramUrl },
  { network: "github", label: "GitHub", href: "https://github.com/CaravanHouse" },
  // { network: "linkedin", label: "LinkedIn", href: "https://linkedin.com/company/..." },
];
