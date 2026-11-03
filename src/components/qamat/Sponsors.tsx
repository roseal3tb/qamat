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
          className="group mx-auto mt-12 flex w-full justify-center md:mt-16"
        >
          <img
            src="/sponsors/sweater.png"
            alt="شعار سويتر"
            loading="lazy"
            decoding="async"
            className="h-auto w-full max-w-[320px] object-contain transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </motion.div>
      </div>
    </section>
  );
}
