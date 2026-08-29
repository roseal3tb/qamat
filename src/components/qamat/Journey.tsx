import { journey } from "@/data/qamatData";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionLabel, WordsReveal } from "./Reveal";

function StageCard({ stage }: { stage: (typeof journey)[number] }) {
  return (
    <div className="qamat-surface p-3.5 text-start sm:p-5 md:p-7">
      <div className="flex items-baseline gap-2 sm:gap-3">
        <span className="text-xl font-semibold leading-none text-primary sm:text-3xl md:text-4xl">
          {stage.num}
        </span>
        <span className="text-[0.6rem] tracking-[0.14em] text-accent-strong sm:text-[0.7rem] sm:tracking-[0.18em]">
          مرحلة
        </span>
      </div>

      <h3 className="mt-2.5 text-[0.88rem] font-semibold leading-snug sm:mt-4 sm:text-lg md:text-xl">
        {stage.title}
      </h3>

      {stage.subtitle && (
        <p className="mt-1.5 text-[0.72rem] leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
          {stage.subtitle}
        </p>
      )}

      {stage.points.length > 0 && (
        <ul className="mt-2.5 space-y-1 sm:mt-4 sm:space-y-1.5">
          {stage.points.map((p) => (
            <li
              key={p}
              className="flex items-start gap-1.5 text-[0.68rem] leading-relaxed text-muted-foreground sm:gap-2 sm:text-[0.82rem]"
            >
              <span
                aria-hidden
                className="mt-[0.5em] inline-block size-1 shrink-0 rounded-full bg-accent"
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
    <section id="journey" className="border-t border-border py-20 md:py-32">
      <div className="container-q">
        <div className="text-center">
          <SectionLabel>رحلة قامات</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-[20ch] text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.2]">
            <WordsReveal text="من أول خطوة... إلى أول أثر" />
          </h2>
        </div>

        <div ref={trackRef} className="relative mx-auto mt-12 max-w-4xl md:mt-24">
          {/* الخط الرمادي الثابت — في المنتصف على كل المقاسات */}
          <span
            aria-hidden
            className="absolute inset-y-0 right-1/2 w-px translate-x-1/2 bg-border"
          />
          {/* الخط الذهبي المتنامي */}
          <motion.span
            aria-hidden
            style={{ height: lineHeight }}
            className="absolute right-1/2 top-0 w-px translate-x-1/2 bg-accent"
          />

          <div className="space-y-5 sm:space-y-6">
            {journey.map((stage, i) => {
              const onRight = i % 2 === 0;

              return (
                <div
                  key={stage.num}
                  className="relative grid grid-cols-2 gap-5 sm:gap-10 md:gap-16"
                >
                  {/* النقطة على الخط */}
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-1/2 top-6 z-10 size-3 translate-x-1/2 rounded-full border-2 border-background bg-accent sm:top-9 sm:size-3.5"
                  />

                  {/* الكارد — يتبادل الجهتين */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 36,
                      x: onRight ? -20 : 20,
                      scale: 0.96,
                    }}
                    whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className={onRight ? "col-start-1 row-start-1" : "col-start-2"}
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