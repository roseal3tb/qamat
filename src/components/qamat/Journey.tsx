import { journey } from "@/data/qamatData";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionLabel, WordsReveal } from "./Reveal";

function StageCard({ stage }: { stage: (typeof journey)[number] }) {
  return (
    <div className="qamat-surface p-6 text-start md:p-7">
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-semibold leading-none text-primary md:text-4xl">
          {stage.num}
        </span>
        <span className="text-[0.7rem] tracking-[0.18em] text-accent-strong">مرحلة</span>
      </div>

      <h3 className="mt-4 text-lg font-semibold md:text-xl">{stage.title}</h3>

      {stage.subtitle && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {stage.subtitle}
        </p>
      )}

      {stage.points.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {stage.points.map((p) => (
            <li
              key={p}
              className="flex items-start gap-2 text-[0.82rem] leading-relaxed text-muted-foreground"
            >
              <span
                aria-hidden
                className="mt-[0.55em] inline-block size-1 shrink-0 rounded-full bg-accent"
              />
              {p}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);

  /* الخط الذهبي يُرسم تدريجيًا مع التمرير */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 65%"],
  });
  const drawn = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 26,
    mass: 0.6,
  });
  const lineHeight = useTransform(drawn, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="border-t border-border py-24 md:py-32">
      <div className="container-q">
        <div className="text-center">
          <SectionLabel>رحلة قامات</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-[20ch] text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.2]">
            <WordsReveal text="من أول خطوة... إلى أول أثر." />
          </h2>
        </div>

        <div ref={trackRef} className="relative mx-auto mt-16 max-w-4xl md:mt-24">
          {/* الخط الرمادي الثابت */}
          <span
            aria-hidden
            className="absolute inset-y-0 right-[13px] w-px bg-border md:right-1/2 md:translate-x-1/2"
          />
          {/* الخط الذهبي المتنامي */}
          <motion.span
            aria-hidden
            style={{ height: lineHeight }}
            className="absolute right-[13px] top-0 w-px bg-accent md:right-1/2 md:translate-x-1/2"
          />

          <div className="space-y-10 md:space-y-6">
            {journey.map((stage, i) => {
              const rightSide = i % 2 === 0;

              return (
                <div
                  key={stage.num}
                  className="relative pr-10 md:grid md:grid-cols-2 md:gap-16 md:pr-0"
                >
                  {/* النقطة */}
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-140px" }}
                    transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-[7px] top-9 z-10 size-3.5 rounded-full border-2 border-background bg-accent md:right-1/2 md:translate-x-1/2"
                  />

                  {/* الكارد — ظهور بطيء من جهة الخط */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 44,
                      x: rightSide ? 28 : -28,
                      scale: 0.96,
                    }}
                    whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-140px" }}
                    transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                    className={
                      rightSide ? "md:col-start-2" : "md:col-start-1 md:row-start-1"
                    }
                  >
                    <StageCard stage={stage} />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}