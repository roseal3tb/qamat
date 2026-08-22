import { objectives } from "@/data/qamatData";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Rocket,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SectionLabel, WordsReveal } from "./Reveal";

/** أيقونة لكل هدف حسب ترتيبه */
const ICONS: LucideIcon[] = [
  Rocket, // تمكين الكفاءات الشابة
  Users, // بناء جسور التعاون
  GraduationCap, // نقل الخبرات والمعارف
  TrendingUp, // تنمية المهارات التخصصية
  Target, // دعم مستهدفات رؤية 2030
  Briefcase, // إتاحة فرص تطبيقية
];

export function Objectives() {
  return (
    <section id="objectives" className="border-t border-border py-24 md:py-32">
      <div className="container-q">
        <div className="text-center">
          <SectionLabel>الأهداف</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-[20ch] text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.25]">
            <WordsReveal text="أهداف تصنع الفارق." />
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {objectives.map((o, i) => {
            const Icon = ICONS[i] ?? Target;

            return (
              <motion.article
                key={o.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{
                  duration: 0.95,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="qamat-surface group flex h-full flex-col items-center gap-4 p-7 text-center"
              >
                {/* الأيقونة الدائرية */}
                <span className="relative grid size-16 shrink-0 place-items-center rounded-full border border-border bg-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent group-hover:bg-accent group-hover:shadow-[0_8px_22px_rgba(168,141,104,0.3)]">
                  <Icon
                    aria-hidden
                    strokeWidth={1.6}
                    className="size-6 text-primary transition-colors duration-500 group-hover:text-accent-foreground"
                  />
                </span>

                <span className="text-[0.7rem] font-medium tracking-[0.2em] text-accent-strong">
                  {o.num}
                </span>

                <h3 className="text-base font-semibold leading-snug sm:text-lg">
                  {o.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {o.desc}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}