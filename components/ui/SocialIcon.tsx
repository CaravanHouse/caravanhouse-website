import type { SVGProps } from "react";
import type { SocialNetwork } from "@/lib/site";
import GithubIcon from "./GithubIcon";
import TelegramIcon from "./TelegramIcon";

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1v5.46h-4v-4.84c0-1.16-.02-2.64-1.61-2.64-1.61 0-1.86 1.26-1.86 2.56v4.92h-4v-11Z" />
    </svg>
  );
}

const icons: Record<SocialNetwork, (props: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  telegram: TelegramIcon,
  instagram: InstagramIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
};

export default function SocialIcon({ network, ...props }: { network: SocialNetwork } & SVGProps<SVGSVGElement>) {
  const Icon = icons[network];
  return <Icon {...props} />;
}
