import { brand, footerLinks, socials } from "@/data/qamatData";
import { useLocation } from "@tanstack/react-router";
import { Instagram, Linkedin } from "lucide-react";

function SocialIcon({ name }: { name: string }) {
  if (name === "Instagram") return <Instagram className="size-[18px]" />;
  if (name === "LinkedIn") return <Linkedin className="size-[18px]" />;
  return <span className="text-sm font-semibold leading-none">X</span>;
}

/** يحوّل رابط المرساة إلى رابط مطلق عندما لا نكون في الصفحة الرئيسية
 *  (نفس منطق Navbar) — بدونها روابط الفوتر لا تعمل إلا من الصفحة الرئيسية */
function resolveHref(href: string, isHome: boolean) {
  if (href.startsWith("#")) return isHome ? href : `/${href}`;
  return href;
}

export function Footer() {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <footer className="border-t border-border bg-muted py-14 md:py-16">
      <div className="container-q">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* الشعار */}
          <a href="#hero" aria-label={brand.nameAr} className="inline-block">
            <img
              src="/logo.png"
              alt={brand.nameAr}
              className="h-16 w-auto object-contain md:h-20"
            />
          </a>

          {/* الشعار النصي */}
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{brand.tagline}</p>

          {/* روابط التنقّل */}
          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {footerLinks.map((l) => (
              <a
                key={l.label}
                href={resolveHref(l.href, isHome)}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* حسابات التواصل — دائرية */}
          <div className="flex items-center justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                target="_blank"
                rel="noreferrer"
                className="grid size-11 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                <SocialIcon name={s.name} />
              </a>
            ))}
          </div>
        </div>

        {/* الحقوق — في المنتصف */}
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            © {year} {brand.nameAr}. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
