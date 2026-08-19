import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks, brand } from "@/data/qamatData";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
  });

  return (
    <>
      {/* =====================================================
          DESKTOP / MAIN NAVBAR
          ===================================================== */}

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2,
        }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="container-q">
          <div
            className={[
              "mt-3 flex items-center justify-between",
              "rounded-sm border",
              "transition-all duration-500",
              scrolled
                ? [
                    "border-border",
                    "bg-ink/85",
                    "px-4 py-2.5",
                    "shadow-[0_14px_50px_-24px_rgba(0,0,0,0.7)]",
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

            {/* =================================================
                LOGO — RIGHT SIDE
                ================================================= */}

            <a
              href="#hero"
              aria-label="العودة إلى الصفحة الرئيسية"
              className="group flex shrink-0 items-center"
            >
              <img
                src="/qamat-logo.png"
                alt="قامات"
                className={[
                  "w-auto object-contain",
                  "transition-all duration-500",
                  scrolled ? "h-10 md:h-11" : "h-12 md:h-14",
                ].join(" ")}
              />
            </a>


            {/* =================================================
                NAVIGATION LINKS
                ================================================= */}

            <nav className="hidden items-center gap-7 lg:flex">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group relative text-sm font-medium text-foreground/75 transition-colors duration-300 hover:text-accent"
                >
                  {l.label}

                  <span
                    className="
                      absolute
                      -bottom-1
                      right-0
                      h-px
                      w-0
                      bg-accent
                      transition-all
                      duration-300
                      group-hover:w-full
                    "
                  />
                </a>
              ))}
            </nav>


            {/* =================================================
                CTA + MOBILE MENU
                ================================================= */}

            <div className="flex items-center gap-2">

              {/* Desktop CTA */}

              <a
                href="#cta"
                className="
                  hidden
                  rounded-sm
                  border
                  border-accent/40
                  bg-primary
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-primary-foreground
                  transition-all
                  duration-300
                  hover:border-accent
                  hover:bg-accent
                  hover:text-accent-foreground
                  sm:inline-flex
                  sm:items-center
                  sm:justify-center
                "
              >
                انضم إلى قامات
              </a>


              {/* Mobile menu */}

              <button
                aria-label="القائمة"
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className="
                  grid
                  size-10
                  place-items-center
                  rounded-sm
                  border
                  border-border
                  bg-ink/30
                  text-foreground
                  transition-all
                  duration-300
                  hover:border-accent
                  hover:text-accent
                  lg:hidden
                "
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>


      {/* =======================================================
          MOBILE MENU
          ======================================================= */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="
              fixed
              inset-0
              z-[60]
              bg-ink
              text-ink-foreground
            "
          >
            <div className="container-q flex h-full flex-col">

              {/* ===============================================
                  MOBILE HEADER
                  =============================================== */}

              <div className="flex items-center justify-between py-6">

                {/* Logo */}

                <a
                  href="#hero"
                  onClick={() => setOpen(false)}
                  aria-label="قامات"
                >
                  <img
                    src="/qamat-logo.png"
                    alt="قامات"
                    className="h-11 w-auto object-contain"
                  />
                </a>


                {/* Close */}

                <button
                  aria-label="إغلاق"
                  onClick={() => setOpen(false)}
                  className="
                    grid
                    size-10
                    place-items-center
                    rounded-sm
                    border
                    border-ink-border
                    transition-colors
                    duration-300
                    hover:border-accent
                    hover:text-accent
                  "
                >
                  <X className="size-5" />
                </button>
              </div>


              {/* ===============================================
                  MOBILE LINKS
                  =============================================== */}

              <nav className="mt-6 flex flex-col gap-1">
                {navLinks.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.08 * i + 0.1,
                      duration: 0.5,
                    }}
                    className="
                      group
                      border-b
                      border-ink-border
                      py-5
                      text-3xl
                      font-medium
                      transition-colors
                      duration-300
                      hover:text-accent
                    "
                  >
                    <span className="ms-3 me-2 text-xs text-accent">
                      0{i + 1}
                    </span>

                    {l.label}
                  </motion.a>
                ))}
              </nav>


              {/* ===============================================
                  MOBILE CTA
                  =============================================== */}

              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="
                  mt-auto
                  mb-10
                  block
                  rounded-sm
                  border
                  border-accent
                  bg-accent
                  py-4
                  text-center
                  text-base
                  font-medium
                  text-accent-foreground
                  transition-all
                  duration-300
                  hover:bg-transparent
                  hover:text-accent
                "
              >
                انضم إلى قامات
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
