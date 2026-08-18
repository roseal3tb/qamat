import { motion } from "framer-motion";
import { transformation } from "@/data/qamatData";
import { WordsReveal } from "./Reveal";

export function Transformation() {
  return (
    <section className="border-t border-border bg-secondary/40 py-24 md:py-36">
      <div className="container-q">
        <h2 className="max-w-[18ch] text-[clamp(1.6rem,3.4vw,2.75rem)] font-semibold leading-[1.3]">
          <WordsReveal text="من المعرفة إلى الأثر — هكذا تعمل قامات." />
        </h2>

        <div className="mt-16 flex flex-col items-start gap-0 md:flex-row md:flex-wrap md:items-center md:gap-4">
          {transformation.map((t, i) => (
            <div key={t} className="flex items-center gap-4 md:contents">
              <motion.span
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`py-3 text-[clamp(1.8rem,5.4vw,4rem)] font-semibold leading-none ${
                  i === transformation.length - 1 ? "text-accent" : "text-foreground"
                }`}
              >
                {t}
              </motion.span>
              {i < transformation.length - 1 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 + 0.15 }}
                  className="text-lg text-accent md:text-2xl"
                  aria-hidden
                >
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">←</span>
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
