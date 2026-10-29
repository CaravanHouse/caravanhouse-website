import Image, { type StaticImageData } from "next/image";
import type { Dictionary } from "@/locales";
import { botUrl, contacts } from "@/lib/site";
import focus from "@/public/bots/focus.jpg";
import quiz from "@/public/bots/quiz.jpg";
import shop from "@/public/bots/shop.jpg";
import post10 from "@/public/channel/post-10.jpg";
import post11 from "@/public/channel/post-11.jpg";
import post12 from "@/public/channel/post-12.jpg";
import clinic from "@/public/projects/clinic.jpg";
import crm from "@/public/projects/crm.jpg";
import edu from "@/public/projects/edu.jpg";
import maktab from "@/public/projects/maktab-portal.jpg";
import newera from "@/public/projects/newera.jpg";
import store from "@/public/projects/store.jpg";
import Availability from "./Availability";
import LeadForm from "./LeadForm";
import Reveal from "./ui/Reveal";
import TelegramIcon from "./ui/TelegramIcon";

// Лента наших работ: сайты, боты и посты канала — всё своё, разной ширины, медленно едет влево.
const strip: { src: StaticImageData; w: number }[] = [
  { src: edu, w: 240 },
  { src: post10, w: 120 },
  { src: newera, w: 240 },
  { src: quiz, w: 150 },
  { src: maktab, w: 240 },
  { src: post11, w: 112 },
  { src: clinic, w: 240 },
  { src: shop, w: 150 },
  { src: store, w: 240 },
  { src: post12, w: 112 },
  { src: crm, w: 240 },
  { src: focus, w: 150 },
];

export default function FinalCTA({ dict }: { dict: Dictionary }) {
  const { finalCta } = dict;

  return (
    <section id="contacts" data-chapter="gold" aria-labelledby="cta-title" className="overflow-hidden pt-24 pb-24 sm:pt-28 sm:pb-32">
      <div aria-hidden="true" className="overflow-hidden">
        <div className="photo-strip flex w-max gap-2">
          {[...strip, ...strip].map((item, index) => (
            <Image
              key={index}
              src={item.src}
              alt=""
              sizes={`${item.w}px`}
              className="h-[110px] w-auto shrink-0 rounded-[12px] object-cover sm:h-[150px]"
              style={{ width: item.w, aspectRatio: undefined }}
            />
          ))}
        </div>
      </div>

      <div className="px-m">
        <div className="mt-16 grid gap-8 sm:mt-[72px] lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <h2 id="cta-title" className="t-head">
              {finalCta.short}
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
            <p className="t-body">{finalCta.subtitle}</p>
          </Reveal>
        </div>

        <div className="mt-10">
          <LeadForm form={finalCta.form} />
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
          <a href={botUrl("site_cta")} target="_blank" rel="noopener noreferrer" className="btn btn-night">
            <TelegramIcon className="h-5 w-5" />
            {finalCta.button}
          </a>
          <p className="t-body">
            {finalCta.orCall}{" "}
            <a href={contacts.phoneHref} className="link-u font-bold">
              {contacts.phone}
            </a>
          </p>
          <Availability t={dict.availability} className="t-small !text-current" />
        </div>
      </div>
    </section>
  );
}
