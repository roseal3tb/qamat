import { Instagram, Linkedin } from "lucide-react";
import { brand, footerLinks, socials } from "@/data/qamatData";

function SocialIcon({ name }: { name: string }) {
  if (name === "Instagram") return <Instagram className="size-4" />;
  if (name === "LinkedIn") return <Linkedin className="size-4" />;
  return <span className="text-sm font-semibold leading-none">X</span>;
}

export function Footer() {
  return (
    <footer className="bg-ink py-14 text-ink-foreground md:py-16">
      <div className="container-q">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="text-2xl font-semibold">
              {brand.nameAr} <span className="text-ink-muted">|</span>{" "}
              <span className="text-base tracking-[0.2em] text-ink-muted">{brand.nameEn}</span>
            </span>
            <p className="mt-3 max-w-xs text-sm text-ink-muted">{brand.tagline}</p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3 md:gap-x-14">
            {footerLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-ink-muted transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="grid size-10 place-items-center rounded-sm border border-ink-border transition-colors hover:border-accent hover:text-accent"
              >
                <SocialIcon name={s.name} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-ink-border pt-6 text-xs text-ink-muted">
          © 2026 قامات. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
