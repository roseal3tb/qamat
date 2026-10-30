import { motion } from "framer-motion";
import { SectionLabel, WordsReveal } from "./Reveal";

export function Sponsors() {
  return (
    <section id="sponsors" className="border-t border-border py-20 md:py-28">
      <div className="container-q">
        <div className="text-center">
          <SectionLabel>الرعاة</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-[18ch] text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.2]">
            <WordsReveal text="رعاة قامات" />
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group mx-auto mt-12 grid aspect-[2/1] w-full max-w-[420px] place-items-center overflow-hidden rounded-[1.25rem] border border-border/70 bg-card p-5 shadow-[0_1px_2px_rgba(20,48,46,0.03),0_8px_24px_rgba(20,48,46,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(20,48,46,0.05),0_16px_40px_rgba(20,48,46,0.1)] sm:p-8 md:mt-16"
        >
          <img
            src="/sponsors/sweater.png"
            alt="شعار سويتر"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.05]"
          />
        </motion.div>
      </div>
    </section>
  );
}
