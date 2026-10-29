import type { Dictionary } from "@/locales";
import Reveal from "./ui/Reveal";

type Props = { dict: Dictionary };

// Четыре поля встык: на каждом одна перемена, которую даёт сайт. Крупная фраза в нижнем углу,
// под ней по диагонали — что сейчас и что будет с сайтом. На чётных полях раскладка зеркалится.
const chapters = ["gold", "sand", "night", "stone"] as const;

export default function Problems({ dict }: Props) {
  const { items } = dict.problems;
  return (
    <div id="problems">
      {items.map((item, index) => {
        const mirror = index % 2 === 1;
        const id = `problem-${index}`;
        return (
          <section
            key={item.phrase}
            data-chapter={chapters[index % chapters.length]}
            aria-labelledby={id}
            className="grid min-h-[64svh] grid-rows-[auto_1fr_auto] px-m py-10 sm:py-14 lg:min-h-[76svh] lg:grid-cols-12"
          >
            <Reveal
              delay={0.04}
              className={`row-start-3 lg:col-span-12 ${mirror ? "lg:text-right" : ""}`}
            >
              <h2 id={id} className="t-display">
                {item.phrase}
              </h2>
            </Reveal>
            <Reveal
              className={`t-body max-w-[34ch] row-start-1 ${mirror ? "lg:col-span-4 lg:col-start-2" : "lg:col-span-4 lg:col-start-8"} ${
                mirror ? "max-lg:ml-auto max-lg:text-right" : ""
              }`}
            >
              <p className="font-semibold opacity-80">{item.problem}.</p>
              <p className="mt-3">{item.solution}</p>
            </Reveal>
          </section>
        );
      })}
    </div>
  );
}
