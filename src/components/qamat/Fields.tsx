import { fields } from "@/data/qamatData";
import { motion } from "framer-motion";
import { SectionLabel, WordsReveal } from "./Reveal";

/**
 * البرامج كأعمدة — كل برنامج قامة ترتفع.
 * الارتفاعات متفاوتة لتشكيل إيقاع بصري، واللون يتناوب على هوية قامات.
 */
const PILLARS = [
  { tint: "186 50% 20%", h: 250 }, // تيل
  { tint: "35 27% 53%", h: 300 }, // ذهبي
  { tint: "226 47% 20%", h: 345 }, // كحلي
  { tint: "186 50% 20%", h: 320 },
  { tint: "35 27% 53%", h: 275 },
  { tint: "226 47% 20%", h: 235 },
];

export function Fields() {
  return (
    <section id="fields" className="border-t border-border py-24 md:py-32">
      <div className="container-q">
        {/* الترويسة */}
        <div className="text-center">
          <SectionLabel>البرامج</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-[20ch] text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.2]">
            <WordsReveal text="اختر البرنامج الأقرب لطموحك" />
          </h2>
        </div>

        {/* الأعمدة */}
        <div className="relative mx-auto mt-16 max-w-5xl md:mt-20">
          {/* خط الأرضية */}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--border) 10%, var(--border) 90%, transparent)",
            }}
          />

          <div className="grid grid-cols-2 items-end gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {fields.map((f, i) => {
              const p = PILLARS[i % PILLARS.length]!;

              return (
                <motion.article
                  key={f.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{
                    duration: 1.1,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={
                    {
                      "--tint": `hsl(${p.tint})`,
                      "--h": `${p.h}px`,
                    } as Record<string, string>
                  }
                  className="group relative flex h-[180px] flex-col justify-between overflow-hidden rounded-t-[1.75rem] rounded-b-xl border p-4 text-center transition-all duration-500 hover:-translate-y-2 sm:h-[220px] sm:p-5 lg:h-[var(--h)]"
                >
                  {/* التعبئة اللونية */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(to top, color-mix(in srgb, var(--tint) 13%, transparent), color-mix(in srgb, var(--tint) 3%, transparent) 55%, transparent)",
                    }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(to top, color-mix(in srgb, var(--tint) 30%, transparent), color-mix(in srgb, var(--tint) 8%, transparent) 60%, transparent)",
                    }}
                  />

                  {/* الرقم */}
                  <span
                    className="text-[0.68rem] font-medium tracking-[0.16em] transition-colors duration-500"
                    style={{ color: "color-mix(in srgb, var(--tint) 65%, transparent)" }}
                  >
                    {f.num}
                  </span>

                  {/* الاسم */}
                  <h3 className="text-[0.95rem] font-semibold leading-snug transition-transform duration-500 group-hover:-translate-y-0.5 sm:text-base lg:text-lg">
                    {f.name}
                  </h3>

                  {/* قاعدة العمود */}
                  <span
                    aria-hidden
                    className="mx-auto h-1 w-6 rounded-full transition-all duration-500 group-hover:w-12"
                    style={{ background: "var(--tint)" }}
                  />
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}