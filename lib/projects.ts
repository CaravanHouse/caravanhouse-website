import type { StaticImageData } from "next/image";
import configuratorShot from "@/public/projects/configurator.png";
import focusGardenShot from "@/public/projects/focus-garden-tg.png";
import quizBotShot from "@/public/projects/quiz-bot.png";
import shopShot from "@/public/projects/shop-miniapp.png";

// Данные демо-проектов, которые не нужно переводить: ссылки, стек и скриншоты.
// Название, категория, описание и alt скриншота лежат в locales/*.ts (projects.items) с тем же id.

export type ProjectId = "shop-miniapp" | "configurator" | "quiz-bot" | "focus-garden-tg";

export interface ProjectMeta {
  id: ProjectId;
  // Куда ведёт карточка: работающее демо. Для ботов и Mini Apps — ссылка t.me на бота, для сайта — его адрес.
  // Пока null, карточка не кликабельна и показывает «Демо запускается».
  demoUrl: string | null;
  // telegram — кнопка «Открыть в Telegram», web — «Открыть сайт»
  demoKind: "telegram" | "web";
  stack: string[];
  shot: StaticImageData;
  // phone — скриншот в рамке телефона, browser — в окне браузера
  frame: "phone" | "browser";
}

// Исходный код всех демо: https://github.com/CaravanHouse
export const projectsOrgUrl = "https://github.com/CaravanHouse";

// Порядок на сайте задаётся здесь
export const projects: ProjectMeta[] = [
  {
    id: "shop-miniapp",
    demoUrl: null, // TODO: https://t.me/<бот магазина>
    demoKind: "telegram",
    stack: ["Mini App", "React", "grammY", "Express"],
    shot: shopShot,
    frame: "phone",
  },
  {
    id: "configurator",
    demoUrl: null, // TODO: адрес конфигуратора на Railway
    demoKind: "web",
    stack: ["React", "grammY", "Express"],
    shot: configuratorShot,
    frame: "browser",
  },
  {
    id: "quiz-bot",
    demoUrl: null, // TODO: https://t.me/<бот-квиз>
    demoKind: "telegram",
    stack: ["grammY", "TypeScript"],
    shot: quizBotShot,
    frame: "phone",
  },
  {
    id: "focus-garden-tg",
    demoUrl: null, // TODO: https://t.me/<бот сада фокуса>
    demoKind: "telegram",
    stack: ["Mini App", "React", "grammY", "Express"],
    shot: focusGardenShot,
    frame: "phone",
  },
];
