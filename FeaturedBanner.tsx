import { featuredMonth } from "@/data/qamatData";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Star } from "lucide-react";

/* =========================================================================
   بانر متميزين الشهر — مستطيل شفاف فوق الهيرو، يفتح صفحة /featured
   ========================================================================= */

export function FeaturedBanner() {
  return (
    <Link
      to="/featured"
      className="animate-rise group mb-3 flex items-center justify-between gap-4 rounded-2xl border border-accent/45 bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-white/30 sm:px-6 sm:py-3.5 md:mb-4"
    >
      <span className="flex min-w-0 items-center gap-3.5">
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent-strong"
        >
          <Star className="size-4 fill-current" strokeWidth={0} />
        </span>

        <span className="min-w-0">
          <span className="block text-sm font-semibold leading-snug sm:text-[0.95rem]">
            متميزو شهر {featuredMonth.monthName}
          </span>
          <span className="block truncate text-xs leading-relaxed text-muted-foreground">
            تعرّف على قادة وأعضاء الشهر
          </span>
        </span>
      </span>

      <span
        aria-hidden
        className="grid size-9 shrink-0 place-items-center rounded-xl border border-accent/45 text-primary transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
      </span>
    </Link>
  );
}
