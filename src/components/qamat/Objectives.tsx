import { objectives } from "@/data/qamatData";
import { motion } from "framer-motion";
import { SectionLabel, WordsReveal } from "./Reveal";

export function Objectives() {
  return (
    <section id="objectives" className="border-t border-border py-20 md:py-32">
      <div className="container-q">
        <div className="text-center">
          <SectionLabel>الأهداف</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-[20ch] text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.25]">
            <WordsReveal text="أهداف تصنع الفارق" />
          </h2>
        </div>

        {/* ستايل: رقم كبير شفاف خلفي + عنوان + وصف قصير */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3.5 sm:gap-5 md:mt-16 lg:grid-cols-4">
          {objectives.map((o, i) => (
            <motion.article
              key={o.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="qamat-surface group relative flex h-full flex-col overflow-hidden p-5 text-start sm:p-6"
            >
              {/* الرقم الكبير الشفاف */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-3 left-2 select-none text-[3.6rem] font-bold leading-none text-[rgba(25,71,76,0.08)] sm:text-[4.6rem]"
              >
                {i + 1}
              </span>

              <h3 className="relative mt-1 text-[0.95rem] font-semibold leading-snug sm:text-lg">
                {o.title}
              </h3>

              {o.desc && (
                <p className="relative mt-2 text-[0.72rem] leading-relaxed text-muted-foreground sm:text-sm">
                  {o.desc}
                </p>
              )}

              {/* خط ذهبي يتمدّد عند المرور */}
              <span
                aria-hidden
                className="mt-4 block h-0.5 w-6 rounded-full bg-accent transition-all duration-500 group-hover:w-12"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}