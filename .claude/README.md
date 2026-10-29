# Claude Code: агенты ECC (Opus)

Агенты, скиллы и правила из [everything-claude-code](https://github.com/affaan-m/everything-claude-code) (MIT, см. `ECC-LICENSE`), все агенты переведены на `model: opus`.

- `agents/` — 71 агент (вызов: «используй агента react-reviewer»)
- `skills/` — скиллы для сайта: React/Next.js, SEO, доступность, тесты, безопасность
- `rules/ecc/` — правила: common, typescript, react, web
- `settings.json` — Opus + high effort для этого проекта

Работает локально и в облачном Claude Code (claude.ai/code).

## Дизайн и анимация (сторонние скиллы, MIT)

- `skills/taste-skill/` — [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill): арт-дирекция для лендингов на основе 247 сайтов, проверка в браузере. Скриптам нужны Node 22+ и Chrome; рабочие файлы пишутся в `.taste-skill/` (в .gitignore).
- `skills/animate/`, `skills/review-animations/` — [emilkowalski/skills](https://github.com/emilkowalski/skills): правила анимаций (кривые, длительности, reduced motion) и ревью анимаций.
