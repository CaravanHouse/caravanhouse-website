// Единое место для контактов и общих настроек сайта.
// Всё, что видит пользователь как текст, лежит в /locales.

export const SITE_URL = "https://caravanhouse.uz";
export const SITE_NAME = "CaravanHouse";

export const contacts = {
  // TODO: проверьте, что это актуальный Telegram-аккаунт для заявок.
  telegramUsername: "umidulloh_uz",
  telegramUrl: "https://t.me/umidulloh_uz",
  // TODO: проверьте номер телефона.
  phone: "+998 99 203 07 09",
  phoneHref: "tel:+998992030709",
  // TODO: при желании замените на корпоративную почту (например, hello@caravanhouse.uz).
  email: "umidbahromov400@gmail.com",
  emailHref: "mailto:umidbahromov400@gmail.com",
} as const;

export type SocialNetwork = "telegram" | "instagram" | "linkedin";

// TODO: добавьте свои соцсети. Иконки для instagram и linkedin уже готовы
// в components/ui/SocialIcon.tsx — достаточно раскомментировать строку и вставить ссылку.
export const socials: { network: SocialNetwork; label: string; href: string }[] = [
  { network: "telegram", label: "Telegram", href: contacts.telegramUrl },
  // { network: "instagram", label: "Instagram", href: "https://instagram.com/..." },
  // { network: "linkedin", label: "LinkedIn", href: "https://linkedin.com/company/..." },
];
