import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/qamatData";
import { WordsReveal } from "./Reveal";

function Counter({ value, prefix }: { value: number; prefix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {String(display).padStart(2, "0")}
    </span>
  );
}

export function Impact() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-ink-foreground md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to left, var(--ink-border) 1px, transparent 1px), linear-gradient(to bottom, var(--ink-border) 1px, transparent 1px)",
          backgroundSize: "clamp(70px, 9vw, 140px) clamp(70px, 9vw, 140px)",
          maskImage: "radial-gradient(ellipse at 70% 50%, black, transparent 75%)",
        }}
      />
      <div className="container-q relative">
        <h2 className="max-w-[16ch] text-[clamp(1.9rem,4.6vw,3.75rem)] font-semibold leading-[1.2]">
          <WordsReveal text="نستثمر في الكفاءة، لنصنع أثرًا أبعد." />
        </h2>

        {/* الأرقام أدناه عناصر بديلة — PLACEHOLDER: استبدلها من qamatData.ts */}
        <div className="mt-16 grid grid-cols-2 gap-px bg-ink-border lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="bg-ink px-5 py-10 md:px-8 md:py-14"
            >
              <span className="block text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-none text-accent">
                <Counter value={s.value} prefix={s.prefix} />
              </span>
              <span className="mt-4 block text-sm text-ink-muted">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
