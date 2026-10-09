import { fields } from "@/data/qamatData";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Reveal, SectionLabel, WordsReveal } from "./Reveal";

/** لون هوية لكل برنامج — يتناوب تيل / ذهبي / كحلي */
const TINTS = [
  "186 50% 20%", // تيل
  "35 27% 53%", // ذهبي
  "226 47% 20%", // كحلي
];

export function Fields() {
  return (
    <section id="fields" className="border-t border-border py-20 md:py-28">
      <div className="container-q">
        {/* الترويسة */}
        <div className="text-center">
          <SectionLabel>البرامج</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-[20ch] text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.2]">
            <WordsReveal text="اختر البرنامج الأقرب لطموحك" />
          </h2>
        </div>

        {/* شبكة كاردز مربعة */}
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:mt-14">
          {fields.map((f, i) => {
            const tint = TINTS[i % TINTS.length];

            return (
              <motion.article
                key={f.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ "--tint": `hsl(${tint})` } as Record<string, string>}
                className="qamat-surface group flex aspect-square flex-col items-center justify-center gap-2.5 p-4 text-center"
              >
                {/* الرقم */}
                <span
                  className="text-[0.62rem] font-medium"
                  style={{ color: "color-mix(in srgb, var(--tint) 70%, transparent)" }}
                >
                  {f.num}
                </span>

                {/* الاسم */}
                <h3 className="text-[0.9rem] font-semibold leading-snug sm:text-base">
                  {f.name}
                </h3>

                {/* خط قاعدي يمتد عند المرور */}
                <span
                  aria-hidden
                  className="h-0.5 w-5 rounded-full transition-all duration-500 group-hover:w-9"
                  style={{ background: "var(--tint)" }}
                />
              </motion.article>
            );
          })}
        </div>

        {/* زر التسجيل في البرامج */}
        <Reveal delay={0.15}>
          <div className="mt-12 flex justify-center md:mt-14">
            <Link
              to="/programs"
              className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_10px_26px_rgba(20,48,46,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 md:text-base"
            >
              سجّل في برامجنا
              <ArrowLeft
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}