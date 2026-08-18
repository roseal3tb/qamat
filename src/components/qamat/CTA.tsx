import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { WordsReveal } from "./Reveal";

export function CTA() {
  const reduce = useReducedMotion();
  return (
    <section
      id="cta"
      className="relative flex min-h-[90svh] items-center overflow-hidden border-t border-border"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          animate={reduce ? {} : { scale: [1, 1.12, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-1/2 size-[70vmin] -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--accent) 26%, transparent), transparent 68%)",
          }}
        />
        <svg className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
          {[...Array(5)].map((_, i) => (
            <motion.line
              key={i}
              x1="0"
              y1={`${18 + i * 16}%`}
              x2="100%"
              y2={`${10 + i * 16}%`}
              stroke="var(--border)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: i * 0.12 }}
            />
          ))}
        </svg>
      </div>

      <div className="container-q relative py-24 text-center">
        <h2 className="mx-auto max-w-[14ch] text-[clamp(2.4rem,8vw,6.5rem)] font-semibold leading-[1.1]">
          <WordsReveal text="مستعد تصنع قامتك؟" />
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
        >
          خطوتك المهنية القادمة قد تبدأ من هنا.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#cta"
            className="group inline-flex items-center gap-3 rounded-sm bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
          >
            انضم إلى قامات
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </a>
          <a
            href="#fields"
            className="inline-flex items-center rounded-sm border border-foreground/20 px-8 py-4 text-sm font-medium transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            استكشف البرامج
          </a>
        </motion.div>
      </div>
    </section>
  );
}
