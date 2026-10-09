import { audience } from "@/data/qamatData";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Landmark, TrendingUp, type LucideIcon } from "lucide-react";
import { SectionLabel, WordsReveal } from "./Reveal";

/** أيقونة ولون لكل فئة */
const CARDS: { Icon: LucideIcon; tint: string }[] = [
  { Icon: Landmark, tint: "186 50% 20%" }, // طلاب وطالبات الجامعات
  { Icon: GraduationCap, tint: "35 27% 53%" }, // حديثو التخرج
  { Icon: TrendingUp, tint: "226 47% 20%" },
  { Icon: Briefcase, tint: "186 50% 20%" },
];

export function Audience() {
  return (
    <section className="border-t border-border py-20 md:py-32">
      <div className="container-q">
        {/* الترويسة */}
        <div className="text-center">
          <SectionLabel>الفئة المستهدفة</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-[18ch] text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.2]">
            <WordsReveal text="لمن صُممت قامات؟" />
          </h2>
        </div>

        {/* البطاقات */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:gap-5 md:mt-16 lg:grid-cols-4">
          {audience.map((a, i) => {
            const { Icon, tint } = CARDS[i % CARDS.length]!;

            return (
              <motion.article
                key={a.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ "--tint": `hsl(${tint})` } as Record<string, string>}
                className="qamat-surface group relative flex h-full flex-col items-center gap-2.5 rounded-[1.25rem] p-4 text-center sm:gap-4 sm:rounded-[1.5rem] sm:p-7"
              >
                {/* الأيقونة + شارة الرقم */}
                <div className="relative">
                  <span
                    className="grid size-11 place-items-center rounded-full transition-all duration-500 group-hover:-translate-y-1 sm:size-16"
                    style={{
                      border: "1px solid color-mix(in srgb, var(--tint) 26%, transparent)",
                      background: "color-mix(in srgb, var(--tint) 8%, transparent)",
                    }}
                  >
                    <Icon
                      aria-hidden
                      strokeWidth={1.6}
                      className="size-[18px] transition-transform duration-500 group-hover:scale-110 sm:size-6"
                      style={{ color: "var(--tint)" }}
                    />
                  </span>

                  <span
                    aria-hidden
                    className="absolute -bottom-1 -left-1 grid size-5 place-items-center rounded-full text-[0.55rem] font-semibold text-white transition-transform duration-500 group-hover:-translate-y-1 sm:size-6 sm:text-[0.6rem]"
                    style={{
                      background: "var(--tint)",
                      boxShadow: "0 0 0 3px var(--card)",
                    }}
                  >
                    {i + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-[0.82rem] font-semibold leading-snug sm:text-base md:text-[1.05rem]">
                    {a.title}
                  </h3>
                  {a.desc && (
                    <p className="mt-1.5 text-[0.7rem] leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
                      {a.desc}
                    </p>
                  )}
                </div>

                {/* خط سفلي يمتد */}
                <span
                  aria-hidden
                  className="mt-auto h-1 w-5 rounded-full transition-all duration-500 group-hover:w-12 sm:w-6 sm:group-hover:w-14"
                  style={{ background: "color-mix(in srgb, var(--tint) 45%, transparent)" }}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}