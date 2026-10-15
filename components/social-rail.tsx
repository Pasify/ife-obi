import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
  XIcon,
} from "@/components/brand-icons";
import { cn } from "@/lib/utils";

const WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "[[WHATSAPP_NUMBER]]";
const EMAIL = "ife.obi61@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/pasify", Icon: GithubIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ifesinachi-obiora-b62b7a216",
    Icon: LinkedinIcon,
  },
  // { label: 'X (Twitter)', href: 'https://twitter.com/paschalobiora_', Icon: XIcon },
  { label: "WhatsApp", href: `https://wa.me/${WHATSAPP}`, Icon: WhatsappIcon },
];

function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("social-list", className)}>
      {SOCIALS.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="social-link"
          >
            <Icon size={20} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SocialRail() {
  return (
    <nav aria-label="Social links" className="social-rail">
      <SocialLinks />
      <span className="rail-line" aria-hidden="true" />
    </nav>
  );
}

export function SocialStrip() {
  return (
    <nav aria-label="Social links" className="social-strip">
      <SocialLinks className="glass" />
    </nav>
  );
}

export function EmailRail() {
  return (
    <div className="email-rail">
      <a href={`mailto:${EMAIL}`} className="email-rail-link">
        {EMAIL}
      </a>
      <span className="email-rail-line" aria-hidden="true" />
    </div>
  );
}
