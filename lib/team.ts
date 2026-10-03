import type { StaticImageData } from "next/image";

// Основатели: данные, которые не нужно переводить (фото и ссылки).
// Имя, роль и короткое описание лежат в locales/*.ts (team.members) с тем же id.

export type MemberId = "umid" | "aslam" | "behruz";

export interface MemberMeta {
  id: MemberId;
  // TODO: положите фото в /public/team/<id>.jpg (квадрат или 4:5, от 800px), импортируйте его
  // вверху файла и укажите здесь. Пока null, на карточке показываются инициалы.
  photo: StaticImageData | null;
  github?: string;
  instagram?: string;
  telegram?: string;
}

export const team: MemberMeta[] = [
  { id: "umid", photo: null, github: "https://github.com/umidulloh-dev" },
  { id: "aslam", photo: null, github: "https://github.com/mw-aslam", instagram: "https://www.instagram.com/mw_aslam/" },
  {
    id: "behruz",
    photo: null,
    github: "https://github.com/Behruz666-uzb",
    instagram: "https://www.instagram.com/behruz_ahmedov_651/",
  },
];
