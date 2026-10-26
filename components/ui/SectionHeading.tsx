import WordReveal from "../motion/WordReveal";
import Parallax from "./Parallax";

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionHeading({ id, title, subtitle, className = "" }: Props) {
  return (
    <Parallax offset={24} className={`flex max-w-3xl flex-col gap-4 ${className}`}>
      <h2 id={id} className="font-display text-[1.75rem] leading-[1.15] font-bold tracking-[-0.02em] text-balance sm:text-4xl lg:text-[2.75rem]">
        <WordReveal text={title} />
      </h2>
      {subtitle ? <p className="max-w-2xl text-base leading-relaxed text-muted text-pretty sm:text-lg">{subtitle}</p> : null}
    </Parallax>
  );
}
