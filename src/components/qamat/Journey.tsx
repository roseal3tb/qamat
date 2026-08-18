import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { journey } from "@/data/qamatData";
import { SectionLabel, WordsReveal } from "./Reveal";

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 90%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(journey.length - 1, Math.floor(v * journey.length + 0.15));
      setActive(Math.max(0, idx));
    });
  }, [scrollYProgress]);

  return (
    <section
      id="journey"
      className="relative overflow-hidden border-t border-ink-border bg-ink py-24 text-ink-foreground md:py-36"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60rem 40rem at 80% 20%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 70%)",
          opacity: useTransform(progress, [0, 0.5, 1], [0.35, 0.8, 0.35]),
        }}
      />
      <div className="container-q relative">
        <span className="label-q">
          <span className="inline-block h-px w-8 bg-accent" />
          03 — رحلة قامات
        </span>
        <h2 className="mt-8 max-w-[16ch] text-[clamp(1.9rem,4.4vw,3.5rem)] font-semibold leading-[1.2]">
          <WordsReveal text="من أول خطوة... إلى أول أثر." />
        </h2>

        <div ref={ref} className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* المؤشر الثابت — سطح المكتب */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-32">
              <motion.span
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="block text-[7rem] font-semibold leading-none text-accent"
              >
                {journey[active].num}
              </motion.span>
              <motion.h3
                key={`t${active}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="mt-4 text-2xl font-medium"
              >
                {journey[active].title}
              </motion.h3>
              <div className="mt-8 space-y-2">
                {journey.map((s, i) => (
                  <div key={s.num} className="flex items-center gap-3">
                    <span
                      className={`h-px transition-all duration-500 ${
                        i === active ? "w-10 bg-accent" : "w-5 bg-ink-border"
                      }`}
                    />
                    <span
                      className={`text-sm transition-colors duration-500 ${
                        i === active ? "text-ink-foreground" : "text-ink-muted"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* الخط الزمني */}
          <div className="relative lg:col-span-8">
            <div className="absolute right-[11px] top-0 h-full w-px bg-ink-border lg:right-[15px]" />
            <motion.div
              style={{ height }}
              className="absolute right-[11px] top-0 w-px bg-accent lg:right-[15px]"
            />

            <div className="space-y-14 md:space-y-20">
              {journey.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pe-0 ps-0 pr-10 lg:pr-14"
                >
                  <span
                    className={`absolute right-0 top-2 grid size-[23px] place-items-center rounded-full border transition-all duration-500 lg:size-[31px] ${
                      i <= active
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-ink-border bg-ink text-ink-muted"
                    }`}
                  >
                    <span className="text-[0.6rem] font-semibold lg:text-xs">{s.num}</span>
                  </span>

                  <h3 className="text-xl font-medium md:text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted md:text-base">{s.subtitle}</p>
                  {s.points.length > 0 && (
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {s.points.map((p, pi) => (
                        <motion.li
                          key={p}
                          initial={{ opacity: 0, x: 16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + pi * 0.07, duration: 0.5 }}
                          className="flex items-start gap-2 border-t border-ink-border pt-3 text-sm text-ink-foreground/85"
                        >
                          <span className="mt-2 inline-block size-1 shrink-0 bg-accent" />
                          {p}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
