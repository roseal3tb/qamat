import { brand, navLinks } from "@/data/qamatData";
import { Link, useLocation } from "@tanstack/react-router";
import { X as CloseIcon, Menu } from "lucide-react";
import { useEffect, useState } from "react";

/** يحوّل رابط المرساة إلى رابط مطلق عندما لا نكون في الصفحة الرئيسية */
function resolveHref(href: string, isHome: boolean) {
  if (href.startsWith("#")) return isHome ? href : `/${href}`;
  return href;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* إغلاق القائمة عند تغيّر الصفحة */
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-4">
      <div className="container-q">
        <nav
          className={`flex items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-400 md:px-5 ${
            scrolled
              ? "border border-border bg-card/85 shadow-[0_4px_24px_rgba(20,48,46,0.07)] backdrop-blur-xl"
              : "border border-transparent bg-transparent"
          }`}
        >
          {/* الشعار */}
          <Link to="/" aria-label={brand.nameAr} className="shrink-0">
            <img
              src="/logo.png"
              alt={brand.nameAr}
              className="h-10 w-auto object-contain md:h-11"
            />
          </Link>

          {/* الروابط — سطح المكتب */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => {
              const isRoute = !l.href.startsWith("#");
              const active = isRoute && pathname === l.href;

              return (
                <li key={l.label}>
                  {isRoute ? (
                    <Link
                      to={l.href}
                      className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 hover:bg-muted hover:text-primary ${
                        active ? "text-primary font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={resolveHref(l.href, isHome)}
                      className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-primary"
                    >
                      {l.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          {/* زر الانضمام + زر القائمة */}
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={isHome ? "#cta" : "/#cta"}
              className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 sm:inline-flex"
            >
              انضم إلى قامات
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-muted lg:hidden"
            >
              {open ? <CloseIcon className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* القائمة — الجوال */}
        {open && (
          <div className="mt-2 overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-[0_8px_32px_rgba(20,48,46,0.1)] lg:hidden">
            <ul className="flex flex-col">
              {navLinks.map((l) => {
                const isRoute = !l.href.startsWith("#");
                return (
                  <li key={l.label}>
                    {isRoute ? (
                      <Link
                        to={l.href}
                        className="block rounded-2xl px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={resolveHref(l.href, isHome)}
                        onClick={() => setOpen(false)}
                        className="block rounded-2xl px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            <a
              href={isHome ? "#cta" : "/#cta"}
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground sm:hidden"
            >
              انضم إلى قامات
            </a>
          </div>
        )}
      </div>
    </header>
  );
}