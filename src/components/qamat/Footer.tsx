import { Instagram, Linkedin } from "lucide-react";
import { brand, footerLinks, socials } from "@/data/qamatData";

function SocialIcon({ name }: { name: string }) {
  if (name === "Instagram") return <Instagram className="size-4" />;
  if (name === "LinkedIn") return <Linkedin className="size-4" />;
  return <span className="text-sm font-semibold leading-none">X</span>;
}

export function Footer() {
  return (
    <footer className="bg-[#15274E] py-14 text-white md:py-16">
      <div className="container-q">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-2xl font-bold tracking-tight">
                {brand.nameAr} <span className="text-white/40">|</span>{" "}
                <span className="text-base font-normal tracking-[0.2em] text-white/70">{brand.nameEn}</span>
              </span>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">{brand.tagline}</p>
            </div>

            {/* لوقو النادي المنظم بالفوتر */}
            <div className="pt-2">
              <span className="block text-xs font-medium text-white/50 mb-2">النادي المنظم:</span>
              <div className="flex items-center gap-3">
                <img
                  src="/club-logo.png"
                  alt="شعار النادي"
                  className="h-10 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3 md:gap-x-14">
            {footerLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium text-white/50">تابعنا على</span>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="grid size-10 place-items-center rounded-md border border-white/15 bg-white/5 text-white/80 transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <SocialIcon name={s.name} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© ٢٠٢٦ قامات. جميع الحقوق محفوظة.</p>
          <p>صُنع لتمكين الكفاءات وبناء الأثر</p>
        </div>
      </div>
    </footer>
  );
}
