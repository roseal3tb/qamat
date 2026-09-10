import { partners } from "@/data/qamatData";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Reveal, SectionLabel, WordsReveal } from "./Reveal";

/** إجمالي الخانات المعروضة — الفارغة تظهر كـ "قريبًا" */
const SLOTS = 4;

/**
 * لون خلفية خانة كل شريك — يطابق لون شعاره
 * حتى يمتلئ المستطيل بلون واحد متصل بلا حواف.
 * الترتيب مطابق لترتيب partners في qamatData.ts
 */
const PARTNER_BG = ["#F5A11E"];

export function Partners() {
  const upcoming = Math.max(0, SLOTS - partners.length);

  return (
    <section id="partners" className="border-t border-border py-20 md:py-32">
      <div className="container-q">
        {/* الترويسة */}
        <div className="text-center">
          <SectionLabel>الشراكات</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-[24ch] text-[clamp(1.7rem,3.8vw,3rem)] font-semibold leading-[1.3]">
            <WordsReveal text="مع شركاء يعرفون السوق، نصنع تجربة أقرب للواقع" />
          </h2>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-loose text-muted-foreground md:text-base">
              يتم تنفيذ البرامج بالتعاون مع شركاء متخصصين لضمان جودة المحتوى
              وارتباطه باحتياجات سوق العمل
            </p>
          </Reveal>
        </div>

        {/* الخانات */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:gap-5 md:mt-16 lg:grid-cols-4">
          {/* الشركاء المؤكَّدون */}
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: PARTNER_BG[i] ?? "var(--card)" }}
              className="group grid aspect-[3/2] place-items-center overflow-hidden rounded-[1.25rem] shadow-[0_1px_2px_rgba(20,48,46,0.03),0_8px_24px_rgba(20,48,46,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(20,48,46,0.05),0_16px_40px_rgba(20,48,46,0.1)]"
            >
              {p.logo ? (
                <img
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-auto max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.05]"
                />
              ) : (
                <span className="px-4 text-center text-xs font-medium text-foreground sm:text-sm">
                  {p.name}
                </span>
              )}
            </motion.div>
          ))}

          {/* خانات قادمة */}
          {Array.from({ length: upcoming }).map((_, i) => (
            <motion.div
              key={`soon-${i}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: (partners.length + i) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid aspect-[3/2] place-items-center rounded-[1.25rem] border border-dashed border-border p-4 transition-colors duration-500 hover:border-accent/50 sm:p-6"
            >
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Clock aria-hidden strokeWidth={1.5} className="size-4 sm:size-5" />
                <span className="text-[0.7rem] tracking-[0.18em] sm:text-xs">
                  قريبًا
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}