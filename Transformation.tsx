import { transformation } from "@/data/qamatData";
import { motion } from "framer-motion";
import { SectionLabel, WordsReveal } from "./Reveal";

/**
 * سكشن التحوّل — المراحل ترتفع تدريجيًا كقامة،
 * وتشتدّ درجة اللون من التيل الهادئ إلى الذهبي في المرحلة الأخيرة.
 */
export function Transformation() {
  const last = transformation.length - 1;

  return (
    <section className="overflow-hidden border-t border-border py-24 md:py-32">
      <div className="container-q">
        <div className="text-center">
          <SectionLabel>التحوّل</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-[22ch] text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.25]">
            <WordsReveal text="من المعرفة إلى الأثر — هكذا تعمل قامات." />
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-4xl md:mt-20">
          <div className="relative flex items-end justify-center gap-2 sm:gap-4 md:gap-6">
            {/* خط الأرضية */}
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--border) 15%, var(--border) 85%, transparent)",
              }}
            />

            {transformation.map((word, i) => {
              const isLast = i === last;
              /* نسبة التقدّم — تحدد الارتفاع وشدّة اللون */
              const t = i / last;
              const rise = 14 + t * 62;

              return (
                <motion.div
                  key={word}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 1.1,
                    delay: i * 0.13,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-1 flex-col items-center"
                >
                  {/* رقم المرحلة */}
                  <span
                    className={`mb-3 text-[0.62rem] tracking-[0.16em] transition-colors duration-500 ${
                      isLast ? "text-accent-strong" : "text-muted-foreground/60"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* الكبسولة */}
                  <span
                    className={`inline-flex w-full items-center justify-center rounded-full border px-2 py-2.5 text-center text-[0.78rem] font-medium leading-tight transition-all duration-500 sm:px-4 sm:py-3 sm:text-sm md:text-base ${
                      isLast
                        ? "border-accent text-accent-foreground shadow-[0_8px_24px_rgba(168,141,104,0.28)]"
                        : "text-foreground"
                    }`}
                    style={
                      isLast
                        ? { background: "var(--accent)" }
                        : {
                            borderColor: `color-mix(in srgb, var(--primary) ${
                              12 + t * 30
                            }%, transparent)`,
                            background: `color-mix(in srgb, var(--primary) ${
                              3 + t * 9
                            }%, var(--card))`,
                          }
                    }
                  >
                    {word}
                  </span>

                  {/* العمود الرافع — يجسّد الارتفاع */}
                  <motion.span
                    aria-hidden
                    initial={{ height: 0 }}
                    whileInView={{ height: rise }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 1.3,
                      delay: i * 0.13 + 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-3 w-px"
                    style={{
                      background: isLast
                        ? "linear-gradient(to bottom, var(--accent), transparent)"
                        : `linear-gradient(to bottom, color-mix(in srgb, var(--primary) ${
                            18 + t * 32
                          }%, transparent), transparent)`,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}