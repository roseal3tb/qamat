import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/data/qamatData";
import { Link } from "@tanstack/react-router";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="container-q">
          <div
            className={[
              "mt-3 flex items-center justify-between",
              "rounded-md border",
              "transition-all duration-500",
              scrolled
                ? [
                    "border-[#15274E]/15",
                    "bg-[#15274E]/90",
                    "px-4 py-2.5",
                    "shadow-[0_18px_60px_-25px_rgba(21,39,78,0.3)]",
                    "backdrop-blur-xl",
                    "md:px-6",
                  ].join(" ")
                : [
                    "border-transparent",
                    "bg-transparent",
                    "px-2 py-4",
                    "md:px-3 md:py-5",
                  ].join(" "),
            ].join(" ")}
          >
            {/* اللوقو بحركته الأصلية */}
            <Link
              to="/"
              aria-label="قامات"
              className="group flex shrink-0 items-center"
            >
              <img
                src="/logo.png"
                alt="قامات"
                className={[
                  "w-auto object-contain",
                  "transition-all duration-500",
                  scrolled
                    ? "h-9 md:h-10 brightness-0 invert"
                    : "h-11 md:h-13",
                ].join(" ")}
              />
            </Link>

            <nav
              aria-label="التنقل الرئيسي"
              className="hidden items-center gap-7 lg:flex"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={[
                    "group relative py-2 text-sm font-semibold transition-colors duration-300",
                    scrolled
                      ? "text-white/80 hover:text-white"
                      : "text-[#15274E]/80 hover:text-[#15274E]",
                  ].join(" ")}
                >
                  {link.label}

                  <span
                    aria-hidden
                    className={[
                      "absolute bottom-0 right-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full",
                      scrolled ? "bg-white" : "bg-[#15274E]",
                    ].join(" ")}
                  />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to="/register"
                className={[
                  "hidden items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-all duration-300 sm:inline-flex",
                  scrolled
                    ? "bg-white text-[#15274E] hover:bg-white/90 shadow-sm"
                    : "bg-[#15274E] text-white hover:bg-[#1E3A8A] shadow-sm",
                ].join(" ")}
              >
                انضم إلينا
              </Link>

              <button
                type="button"
                aria-label="فتح القائمة"
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className={[
                  "grid size-10 place-items-center rounded-md border transition-all duration-300 lg:hidden",
                  scrolled
                    ? "border-white/20 bg-white/10 text-white"
                    : "border-[#15274E]/15 bg-[#15274E]/5 text-[#15274E]",
                ].join(" ")}
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#15274E] text-white"
          >
            <div className="container-q relative flex h-full flex-col">
              <div className="flex items-center justify-between py-5">
                <Link
                  to="/"
                  aria-label="قامات"
                  onClick={() => setOpen(false)}
                  className="flex items-center"
                >
                  <img
                    src="/logo.png"
                    alt="قامات"
                    className="h-10 w-auto object-contain brightness-0 invert"
                  />
                </Link>

                <button
                  type="button"
                  aria-label="إغلاق القائمة"
                  onClick={() => setOpen(false)}
                  className="grid size-10 place-items-center rounded-md border border-white/20 text-white transition-all duration-300 hover:bg-white/10"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav aria-label="القائمة" className="mt-8 flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.07 }}
                    className="group flex items-center border-b border-white/10 py-5 text-xl font-medium text-white/90 transition-colors duration-300 hover:text-white"
                  >
                    <span className="ml-3 text-xs font-semibold tracking-wider text-white/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto pb-8">
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-md bg-white px-6 py-4 text-sm font-bold text-[#15274E] shadow-lg transition-all duration-300 hover:bg-white/95"
                >
                  انضم إلينا
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
