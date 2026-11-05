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
          className="mx-auto mt-10 flex justify-center md:mt-12"
        >
          {/* الشعار مفرّغ بدون أي خلفية أو بوكس */}
          <img
            src="/sponsors/sweater.png"
            alt="شعار سويتر"
            loading="lazy"
            decoding="async"
            className="h-16 w-auto object-contain transition-transform duration-500 hover:scale-105 sm:h-20"
          />
        </motion.div>
      </div>
    </section>
  );
}