import { motion } from "framer-motion";
import { Reveal, SectionLabel, WordsReveal } from "./Reveal";

/**
 * أعمدة "عن قامات" — قابلة للتحرير.
 */
const pillars = [
  { num: "01", title: "تطوير المهارات" },
  { num: "02", title: "الجاهزية المهنية" },
  { num: "03", title: "نقل الخبرات" },
  { num: "04", title: "بناء الكفاءات" },
];

export function About() {
  return (
    <section id="about" className="border-t border-border py-24 md:py-32">
      <div className="container-q">
        {/* الترويسة */}
        <div className="text-center">
          <SectionLabel>عن قامات</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-[18ch] text-[clamp(1.9rem,4.6vw,3.4rem)] font-semibold leading-[1.25]">
            <WordsReveal text="الكفاءة لا تُكتشف فقط، بل تُبنى" />
          </h2>
        </div>

        {/* النص */}
        <div className="mx-auto mt-14 max-w-3xl">
          <Reveal>
            <p className="text-center text-base leading-loose text-foreground/85 md:text-lg">
              قامات هي مبادرة نوعية تهدف إلى بناء وتمكين الكفاءات الشابة من خلال شراكات استراتيجية
              مع جهات رائدة لإنشاء برامج متخصصة في المجالات المهنية الواعدة
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <span aria-hidden className="qamat-gold-line mx-auto my-9 block w-32" />
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-center text-base leading-loose text-muted-foreground">
              تهدف المبادرة إلى تطوير المهارات وتعزيز الجاهزية المهنية ونقل الخبرات العملية
              للمشاركين عبر تجارب تدريبية وتطبيقية تسهم في إعداد جيل من الكفاءات القادرة على صناعة
              الأثر والمنافسة في سوق العمل
            </p>
          </Reveal>
        </div>

        {/* الأعمدة الأربعة */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.9, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="qamat-surface group flex flex-col items-center gap-3 p-6 text-center"
            >
              <span className="text-xs font-medium tracking-[0.2em] text-accent-strong">
                {p.num}
              </span>
              <span
                aria-hidden
                className="h-px w-8 bg-border transition-all duration-500 group-hover:w-14 group-hover:bg-accent"
              />
              <h3 className="text-base font-semibold leading-snug sm:text-lg">{p.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
