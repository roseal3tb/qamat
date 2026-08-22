import { brand } from "@/data/qamatData";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";

/* =========================================================================
   اللوقو يتكوّن عمود عمود
   -------------------------------------------------------------------------
   الشعار مقسّم إلى أعمدة رأسية، كل عمود يرتفع من الأسفل بالتتابع
   حتى تكتمل قامة قامات.

   يتطلب وجود الملف: public/qamat-logo.png
   ========================================================================= */

/** عدد الأعمدة — زِده لحركة أنعم، قلّله لأعمدة أعرض */
const SLICES = 3;

/** مدة صعود العمود الواحد (ثانية) */
const RISE = 2.1;

/** الفاصل الزمني بين عمود وآخر (ثانية) */
const GAP = 0.38;

function LogoBuild({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      role="img"
      aria-label={`شعار ${brand.nameAr}`}
      className={`relative aspect-square ${className}`}
    >
      {/* وهج خلف الشعار */}
      <motion.div
        aria-hidden
        className="qamat-glow absolute inset-[-15%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 2.2, delay: 1.4 }}
      />

      {Array.from({ length: SLICES }).map((_, i) => {
        const start = (i * 100) / SLICES;
        const end = 100 - ((i + 1) * 100) / SLICES;

        return (
          <div
            key={i}
            aria-hidden
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${end}% 0 ${start}%)` }}
          >
            <motion.img
              src="/qamat-logo.png"
              alt=""
              className="size-full object-contain"
              initial={reduce ? { opacity: 0 } : { y: "108%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: reduce ? 0.4 : RISE,
                delay: reduce ? 0 : 0.5 + i * GAP,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================================
   خلفية الهيرو
   ========================================================================= */

function HeroBackdrop() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to left, rgba(233,229,219,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(233,229,219,0.06) 1px, transparent 1px)",
          backgroundSize: "clamp(56px, 7vw, 100px) clamp(56px, 7vw, 100px)",
          maskImage: "radial-gradient(ellipse at 50% 50%, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black, transparent 80%)",
        }}
      />
      <motion.div
        className="qamat-gold-line absolute inset-x-0 bottom-0 h-px"
        initial={{ opacity: 0, scaleX: 0.3 }}
        animate={{ opacity: 0.8, scaleX: 1 }}
        transition={{ duration: reduce ? 0 : 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/* =========================================================================
   الهيرو
   ========================================================================= */

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const line = "نبني الكفاءات، نصنع الخبرة، ونمكّن الأثر.";

  return (
    <section id="hero" ref={ref} className="pt-24 md:pt-28">
      <div className="container-q">
        <div className="surface-dark qamat-hero relative overflow-hidden">
          <HeroBackdrop />

          {/* ===== الشعار — عنصر خلفي على اليسار ===== */}
          <div className="pointer-events-none absolute inset-y-0 -left-[14%] flex items-center opacity-20 sm:-left-[8%] sm:opacity-30 md:-left-[5%] md:opacity-95">
            <LogoBuild className="w-[86vw] sm:w-[52vw] md:w-[40vw] md:max-w-[500px]" />
          </div>

          {/* حجاب ناعم خلف النص ليبقى مقروءًا فوق الشعار */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 70% at 55% 50%, rgba(20,48,46,0.72), transparent 70%)",
            }}
          />

          {/* ===== النص — موسّط في منتصف البلوك ===== */}
          <motion.div
            style={{ y, opacity }}
            className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 py-16 text-center md:px-10 md:py-24"
          >
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="label-q"
            >
              <span className="inline-block h-px w-7 bg-accent" />
              {brand.nameEn}
              <span className="inline-block h-px w-7 bg-accent" />
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-[1] tracking-tight"
            >
              {brand.nameAr}
            </motion.h1>

            <p className="mt-6 text-[clamp(1.05rem,2.4vw,1.6rem)] font-medium leading-[1.6]">
              {line.split(" ").map((w, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden pb-[0.18em] -mb-[0.18em] align-bottom"
                >
                  <motion.span
                    className={`inline-block ${w.includes("الأثر") ? "text-accent" : ""}`}
                    initial={{ y: "1em", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.7 + i * 0.07,
                      duration: 0.85,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {w}&nbsp;
                  </motion.span>
                </span>
              ))}
            </p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.8 }}
              className="mt-6 max-w-lg text-sm leading-loose text-muted-foreground md:text-base"
            >
              {brand.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="#cta"
                className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110"
              >
                سجّل في قامات
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center rounded-full border border-border px-7 py-3.5 text-sm font-medium transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                تعرّف على المبادرة
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}