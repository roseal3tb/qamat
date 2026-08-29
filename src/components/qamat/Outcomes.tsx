import { outcomes } from "@/data/qamatData";
import { motion } from "framer-motion";
import { SectionLabel, WordsReveal } from "./Reveal";

export function Outcomes() {
  return (
    <section id="outcomes" className="border-t border-border py-20 md:py-28">
      <div className="container-q">
        {/* الترويسة */}
        <div className="text-center">
          <SectionLabel>المخرجات</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-[18ch] text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.2]">
            <WordsReveal text="ماذا تترك قامات؟" />
          </h2>
        </div>

        {/*
          flex-wrap بدل grid حتى يتوسّط الصف الأخير تلقائيًا
          (خمس بطاقات: 2 + 2 + 1)
        */}
        <div className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-3 sm:gap-5 md:mt-16">
          {outcomes.map((o, i) => (
            <motion.article
              key={o.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group flex w-[calc(50%-0.375rem)] flex-col justify-start rounded-2xl border border-border/70 bg-card p-3.5 text-start shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md sm:w-[calc(50%-0.625rem)] sm:p-6 lg:w-[calc(33.333%-0.834rem)]"
            >
              {/* الرقم */}
              <span className="mb-3 grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-muted/50 text-[0.68rem] font-bold text-accent-strong transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground sm:mb-5 sm:size-11 sm:rounded-xl sm:text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* العنوان */}
              <h3 className="text-[0.82rem] font-bold leading-snug text-foreground sm:text-base md:text-lg">
                {o.title}
              </h3>

              {/* الوصف */}
              {o.desc && (
                <p className="mt-1.5 text-[0.7rem] leading-relaxed text-muted-foreground sm:mt-2.5 sm:text-sm">
                  {o.desc}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}