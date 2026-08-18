import { motion } from "framer-motion";
import { outcomes } from "@/data/qamatData";
import { SectionLabel, WordsReveal } from "./Reveal";

export function Outcomes() {
  return (
    <section id="outcomes" className="border-t border-border py-24 md:py-36">
      <div className="container-q">
        <SectionLabel>06 — المخرجات</SectionLabel>
        <h2 className="mt-8 text-[clamp(1.9rem,4.4vw,3.5rem)] font-semibold leading-[1.2]">
          <WordsReveal text="ماذا تترك قامات؟" />
        </h2>

        <div className="mt-14">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group grid gap-3 border-t border-border py-8 md:grid-cols-12 md:items-baseline md:py-12"
            >
              <span className="text-xs text-accent md:col-span-1">{`0${i + 1}`}</span>
              <h3 className="text-[clamp(1.4rem,3vw,2.4rem)] font-medium leading-snug transition-transform duration-500 group-hover:-translate-x-1.5 md:col-span-7">
                {o.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:col-span-4 md:text-base">
                {o.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
