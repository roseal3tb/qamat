import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import { brand } from "@/data/qamatData";

function HeroVisual() {
  const reduce = useReducedMotion();
  const rings = [0, 1, 2, 3, 4];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* شبكة خفيفة */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to left, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "clamp(60px, 8vw, 120px) clamp(60px, 8vw, 120px)",
          maskImage: "radial-gradient(ellipse at 30% 40%, black, transparent 72%)",
        }}
      />
      {/* أقواس متنامية */}
      <svg
        className="absolute -left-[10%] top-1/2 h-[120vmin] w-[120vmin] -translate-y-1/2"
        viewBox="0 0 400 400"
        fill="none"
      >
        {rings.map((r) => (
          <motion.circle
            key={r}
            cx="200"
            cy="200"
            r={40 + r * 36}
            stroke="var(--foreground)"
            strokeOpacity={0.12}
            strokeWidth="0.6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: reduce ? 0 : 2.2, delay: 0.2 + r * 0.15 }}
          />
        ))}
        <motion.circle
          cx="200"
          cy="200"
          r="148"
          stroke="var(--accent)"
          strokeWidth="1.2"
          strokeDasharray="6 12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9, rotate: reduce ? 0 : 360 }}
          style={{ transformOrigin: "200px 200px" }}
          transition={{
            opacity: { duration: 1, delay: 0.6 },
            rotate: { duration: 90, repeat: Infinity, ease: "linear" },
          }}
        />
        {[...Array(7)].map((_, i) => (
          <motion.line
            key={i}
            x1="200"
            y1="200"
            x2={200 + 190 * Math.cos((i / 7) * Math.PI * 2)}
            y2={200 + 190 * Math.sin((i / 7) * Math.PI * 2)}
            stroke="var(--foreground)"
            strokeOpacity="0.08"
            strokeWidth="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduce ? 0 : 1.6, delay: 0.8 + i * 0.08 }}
          />
        ))}
        {[...Array(9)].map((_, i) => (
          <motion.circle
            key={`d${i}`}
            cx={200 + (60 + (i % 4) * 40) * Math.cos((i / 9) * Math.PI * 2)}
            cy={200 + (60 + (i % 4) * 40) * Math.sin((i / 9) * Math.PI * 2)}
            r="2"
            fill="var(--accent)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.3, 1, 0.3], scale: 1 }}
            transition={{
              opacity: { duration: 4, repeat: Infinity, delay: i * 0.4 },
              scale: { duration: 0.6, delay: 1 + i * 0.08 },
            }}
          />
        ))}
      </svg>
      {/* أعمدة "قامات" المتنامية */}
      <div className="absolute bottom-0 left-[6%] hidden items-end gap-3 md:flex">
        {[38, 66, 96, 132, 172, 118].map((h, i) => (
          <motion.span
            key={i}
            initial={{ height: 0 }}
            animate={{ height: h }}
            transition={{
              duration: reduce ? 0 : 1.1,
              delay: 0.9 + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={i === 4 ? "w-[3px] bg-accent" : "w-[3px] bg-foreground/15"}
          />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const line = "نبني الكفاءات، نصنع الخبرة، ونمكّن الأثر.";

  return (
    <section id="hero" ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <HeroVisual />
      <motion.div
        style={{ y, opacity }}
        className="container-q relative flex min-h-[100svh] flex-col justify-center pt-32 pb-24"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="label-q"
        >
          <span className="inline-block h-px w-8 bg-accent" />
          مبادرة {brand.nameAr} — {brand.nameEn}
        </motion.span>

        <h1 className="mt-8 max-w-[18ch] text-[clamp(2.4rem,7.2vw,6rem)] font-semibold leading-[1.12] tracking-tight">
          {line.split(" ").map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className={`inline-block ${w.includes("الأثر") ? "text-accent" : ""}`}
                initial={{ y: "1em", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}&nbsp;
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {brand.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#about"
            className="group inline-flex items-center gap-3 rounded-sm bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
          >
            اكتشف قامات
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </a>
          <a
            href="#journey"
            className="inline-flex items-center gap-3 rounded-sm border border-foreground/20 px-7 py-4 text-sm font-medium transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            اكتشف الرحلة
          </a>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-8 left-5 flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground md:left-10"
        >
          اكتشف
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
