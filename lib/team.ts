import type { StaticImageData } from "next/image";
import aslamPhoto from "@/public/team/aslam.jpg";
import behruzPhoto from "@/public/team/behruz.jpg";
import umidPhoto from "@/public/team/umid.jpg";

// Основатели: данные, которые не нужно переводить (фото и ссылки).
// Имя, роль и короткое описание лежат в locales/*.ts (team.members) с тем же id.

export type MemberId = "umid" | "aslam" | "behruz";

export interface MemberMeta {
  id: MemberId;
  // Фото в /public/team/<id>.jpg, кадр 4:5 (на телефоне показывается квадратом).
  // null — на карточке показываются инициалы.
  photo: StaticImageData | null;
  github?: string;
  instagram?: string;
  telegram?: string;
}

export const team: MemberMeta[] = [
  {
    id: "umid",
    photo: umidPhoto,
    telegram: "https://t.me/umidulloh_uz",
    instagram: "https://www.instagram.com/umidullohuz/",
    github: "https://github.com/umidulloh-dev",
  },
  {
    id: "aslam",
    photo: aslamPhoto,
    telegram: "https://t.me/nnaslann",
    instagram: "https://www.instagram.com/mw_aslam/",
    github: "https://github.com/mw-aslam",
  },
  {
    id: "behruz",
    photo: behruzPhoto,
    telegram: "https://t.me/Behruz651",
    instagram: "https://www.instagram.com/behruz_ahmedov_651/",
    github: "https://github.com/Behruz666-uzb",
  },
];
