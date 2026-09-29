# CaravanHouse — сайт IT-компании

Одностраничный сайт [caravanhouse.uz](https://caravanhouse.uz): разработка Telegram-ботов, веб-сайтов и Telegram Mini Apps для бизнеса в Узбекистане. Главная цель сайта — чтобы клиент написал в Telegram.

## Стек

- [Next.js 16](https://nextjs.org) (App Router, полностью статическая генерация) + TypeScript
- Tailwind CSS v4
- Framer Motion (появление блоков при скролле, мобильное меню) с учётом `prefers-reduced-motion`
- lucide-react — иконки
- Без бэкенда и базы данных

## Быстрый старт

```bash
npm install
npm run dev      # http://localhost:3000 → редирект на /ru
```

Другие команды:

```bash
npm run build    # production-сборка (проверяет TypeScript)
npm run start    # запуск собранной версии
npm run lint     # ESLint
```

Требуется Node.js 20.9+.

## Структура

```
app/
  [lang]/
    layout.tsx           # <html lang>, шрифт, SEO-метаданные, hreflang, canonical
    page.tsx             # сборка страницы из секций
    opengraph-image.tsx  # OG-картинка 1200×630 для каждого языка
    twitter-image.tsx    # то же для Twitter/X
  icon.svg               # favicon
  apple-icon.tsx         # иконка для iOS
  sitemap.ts             # /sitemap.xml
  robots.ts              # /robots.txt
  globals.css            # цвета, шрифт, утилиты Tailwind
components/              # по одному компоненту на секцию + ui/
locales/
  ru.ts                  # все тексты на русском (язык по умолчанию)
  uz.ts                  # все тексты на узбекском (латиница)
  index.ts               # список языков и getDictionary()
lib/
  site.ts                # контакты, ссылки на соцсети, домен
  og.tsx                 # шаблон OG-картинки
assets/fonts/            # Manrope для генерации OG-картинок
```

## Как менять контент

- **Тексты** хранятся только в `locales/ru.ts` и `locales/uz.ts`, в компонентах их нет. Структура словарей одинаковая, TypeScript не даст забыть перевод.
- **Контакты и соцсети** находятся в `lib/site.ts`.
- **Проекты (кейсы)** — это блок `projects.items` в словарях. Обложки задаются в `components/Projects.tsx`, см. TODO там.
- **Цвета** — токены в `@theme` в `app/globals.css`, акцентный цвет называется `--color-accent`.

Найти все места, которые нужно заполнить:

```bash
grep -rn "TODO" app components lib locales
```

## Языки и маршруты

- `/` → временный редирект на `/ru` (`next.config.ts`)
- `/ru` — русская версия, `/uz` — узбекская
- Каждая версия получает свой `title`, `description`, Open Graph, Twitter-теги, `canonical` и `hreflang` (ru, uz, x-default).

## Деплой

Проект подключён к Vercel через GitHub: **каждый пуш в `main` автоматически выкатывается на caravanhouse.uz**. Для pull request'ов и других веток Vercel создаёт preview-ссылки.

```bash
git add .
git commit -m "Обновил тексты"
git push
```

> Год в футере берётся на момент сборки, поэтому после Нового года достаточно любого деплоя.
