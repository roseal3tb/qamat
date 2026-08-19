import logoImg from "@/logo.png";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/data/qamatData";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <>
      {/* =====================================================
          NAVBAR
          ===================================================== */}

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
              "rounded-sm border",
              "transition-all duration-500",
              scrolled
                ? [
                    "border-white/10",
                    "bg-[#1B264A]/85",
                    "px-4 py-2.5",
                    "shadow-[0_18px_60px_-25px_rgba(0,0,0,0.7)]",
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
                LOGO — RIGHT
                ================================================= */}

            <a
              href="#hero"
              aria-label="قامات"
              className="group flex shrink-0 items-center"
            >
              <img
                src="/logo.png"
                alt="قامات"
                className={[
                  "w-auto object-contain",
                  "transition-all duration-500",
                  scrolled ? "h-9 md:h-10" : "h-11 md:h-13",
                ].join(" ")}
              />
            </a>

            {/* =================================================
                DESKTOP NAVIGATION
                ================================================= */}

            <nav
              aria-label="التنقل الرئيسي"
              className="hidden items-center gap-7 lg:flex"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="
                    group
                    relative
                    py-2
                    text-sm
                    font-medium
                    text-foreground/75
                    transition-colors
                    duration-300
                    hover:text-accent
                  "
                >
                  {link.label}

                  <span
                    aria-hidden
                    className="
                      absolute
                      bottom-0
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
                RIGHT ACTIONS
                ================================================= */}

            <div className="flex items-center gap-2">
              {/* Desktop CTA */}

              <a
                href="#cta"
                className="
                  hidden
                  items-center
                  justify-center
                  rounded-sm
                  border
                  border-accent/50
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
                "
              >
                انضم إلى قامات
              </a>

              {/* Mobile menu button */}

              <button
                type="button"
                aria-label="فتح القائمة"
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className="
                  grid
                  size-10
                  place-items-center
                  rounded-sm
                  border
                  border-white/10
                  bg-[#1B264A]/50
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

      {/* =====================================================
          MOBILE MENU
          ===================================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="
              fixed
              inset-0
              z-[60]
              bg-[#1B264A]
              text-foreground
            "
          >
            {/* Ambient gold light */}

            <div
              aria-hidden
              className="
                pointer-events-none
                absolute
                -right-32
                -top-32
                size-[28rem]
                rounded-full
                bg-[#A88D68]/10
                blur-3xl
              "
            />

            <div className="container-q relative flex h-full flex-col">
              {/* =================================================
                  MOBILE HEADER
                  ================================================= */}

              <div className="flex items-center justify-between py-5">
                {/* Logo */}

                <a
                  href="#hero"
                  aria-label="قامات"
                  onClick={() => setOpen(false)}
                  className="flex items-center"
                >
                  <img
                    src="/qamat-logo.png"
                    alt="قامات"
                    className="h-10 w-auto object-contain"
                  />
                </a>

                {/* Close button */}

                <button
                  type="button"
                  aria-label="إغلاق القائمة"
                  onClick={() => setOpen(false)}
                  className="
                    grid
                    size-10
                    place-items-center
                    rounded-sm
                    border
                    border-white/10
                    transition-all
                    duration-300
                    hover:border-accent
                    hover:text-accent
                  "
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* =================================================
                  MOBILE NAVIGATION
                  ================================================= */}

              <nav
                aria-label="القائمة"
                className="mt-8 flex flex-col"
              >
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.07,
                    }}
                    className="
                      group
                      flex
                      items-center
                      border-b
                      border-white/10
                      py-5
                      text-2xl
                      font-medium
                      transition-colors
                      duration-300
                      hover:text-accent
                    "
                  >
                    <span
                      className="
                        ml-3
                        text-xs
                        font-medium
                        tracking-[0.18em]
                        text-accent
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* =================================================
                  MOBILE CTA
                  ================================================= */}

              <div className="mt-auto pb-8">
                <a
                  href="#cta"
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    rounded-sm
                    border
                    border-accent
                    bg-accent
                    px-6
                    py-4
                    text-sm
                    font-semibold
                    text-[#1B264A]
                    transition-all
                    duration-300
                    hover:bg-transparent
                    hover:text-accent
                  "
                >
                  انضم إلى قامات
                </a>

                <div className="mt-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />

                  <span className="text-[10px] tracking-[0.25em] text-white/35">
                    QAMAT
                  </span>

                  <div className="h-px flex-1 bg-white/10" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
