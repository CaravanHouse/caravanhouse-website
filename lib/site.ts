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
  instagramUsername: "caravanhouse.uz",
  instagramUrl: "https://www.instagram.com/caravanhouse.uz/",
} as const;

export type SocialNetwork = "telegram" | "instagram" | "github" | "linkedin";

// Иконка для linkedin тоже готова в components/ui/SocialIcon.tsx — достаточно раскомментировать строку.
export const socials: { network: SocialNetwork; label: string; href: string }[] = [
  { network: "telegram", label: "Telegram", href: contacts.telegramUrl },
  { network: "instagram", label: "Instagram", href: contacts.instagramUrl },
  { network: "github", label: "GitHub", href: "https://github.com/CaravanHouse" },
  // { network: "linkedin", label: "LinkedIn", href: "https://linkedin.com/company/..." },
];
