import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Reveal, WordsReveal } from "./Reveal";

export function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden border-t border-border py-28 md:py-36">
      {/* وهج ذهبي خفيف خلف النص */}
      <div
        aria-hidden
        className="qamat-glow pointer-events-none absolute left-1/2 top-1/2 size-[40rem] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 opacity-70"
      />

      <div className="container-q relative text-center">
        <h2 className="mx-auto max-w-[16ch] text-[clamp(2.1rem,5.4vw,4rem)] font-semibold leading-[1.25]">
          <WordsReveal text="مكانك بين صُنّاع الأثر" />
        </h2>

        <Reveal delay={0.25}>
          <p className="mx-auto mt-6 max-w-lg text-base leading-loose text-muted-foreground md:text-lg">
            انضم معنا وساهم في بناء وتطوير قامات
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <span aria-hidden className="qamat-gold-line mx-auto mt-10 block w-36" />
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex justify-center"
        >
          <Link
            to="/join"
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-9 py-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 md:text-base"
          >
            انضم لفريق العمل
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
