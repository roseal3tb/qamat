import { featuredMonth } from "@/data/qamatData";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";

/* =========================================================================
   بانر متميزي الشهر — فوق الهيرو، يفتح صفحة /featured
   ========================================================================= */

export function FeaturedBanner() {
  return (
    <Link
      to="/featured"
      className="animate-rise group relative mb-3 flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-accent/40 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:border-accent sm:px-5 md:mb-4"
      style={{
        background:
          "linear-gradient(110deg, rgba(168,141,104,0.16), rgba(255,255,255,0.08) 55%, rgba(168,141,104,0.12))",
      }}
    >
      {/* لمعة متحركة خفيفة */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
      />

      <span className="relative flex min-w-0 items-center gap-3">
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground shadow-[0_4px_14px_rgba(168,141,104,0.4)]"
        >
          <Sparkles className="size-[18px]" strokeWidth={1.8} />
        </span>

        <span className="min-w-0">
          <span className="flex items-center gap-2">
            <span className="text-sm font-semibold leading-snug sm:text-[0.95rem]">
              متميزو شهر {featuredMonth.monthName}
            </span>
            <span className="hidden rounded-full bg-accent/15 px-2 py-0.5 text-[0.6rem] font-medium text-accent-strong sm:inline">
              جديد
            </span>
          </span>
          <span className="block truncate text-xs leading-relaxed text-muted-foreground">
            تعرّف على الإدارات والقادة والأعضاء المتميزين
          </span>
        </span>
      </span>

      <span
        aria-hidden
        className="relative grid size-9 shrink-0 place-items-center rounded-xl border border-accent/45 text-primary transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
      </span>
    </Link>
  );
}