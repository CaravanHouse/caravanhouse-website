// Данные демо-проектов, которые не нужно переводить: ссылки и стек.
// Название, категория и описание лежат в locales/*.ts (projects.items) с тем же id.

export type ProjectId = "shop-miniapp" | "configurator" | "quiz-bot" | "focus-garden-tg";

export interface ProjectMeta {
  id: ProjectId;
  repoUrl: string;
  // TODO: после деплоя на Railway впишите публичный адрес демо (сайт или ссылку на бота t.me/...),
  // и на карточке появится кнопка «Открыть демо». Пока null — показываем только ссылку на код.
  demoUrl: string | null;
  stack: string[];
}

// Порядок на сайте задаётся здесь
export const projects: ProjectMeta[] = [
  {
    id: "shop-miniapp",
    repoUrl: "https://github.com/CaravanHouse/shop-miniapp",
    demoUrl: null,
    stack: ["Mini App", "React", "grammY", "Express"],
  },
  {
    id: "configurator",
    repoUrl: "https://github.com/CaravanHouse/configurator",
    demoUrl: null,
    stack: ["React", "grammY", "Express"],
  },
  {
    id: "quiz-bot",
    repoUrl: "https://github.com/CaravanHouse/quiz-bot",
    demoUrl: null,
    stack: ["grammY", "TypeScript"],
  },
  {
    id: "focus-garden-tg",
    repoUrl: "https://github.com/CaravanHouse/focus-garden-tg",
    demoUrl: null,
    stack: ["Mini App", "React", "grammY", "Express"],
  },
];
