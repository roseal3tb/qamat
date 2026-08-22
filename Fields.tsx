import { fields } from "@/data/qamatData";
import { ArrowLeft } from "lucide-react";
import { Reveal, SectionLabel, WordsReveal } from "./Reveal";

export function Fields() {
  return (
    <section id="fields" className="border-t border-border py-24 md:py-32">
      <div className="container-q">
        {/* ترويسة موسّطة */}
        <div className="text-center">
          <SectionLabel>المجالات</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-[18ch] text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.2]">
            <WordsReveal text="اختر المسار الأقرب لطموحك." />
          </h2>
        </div>

        {/* شبكة الكاردز — مربعة مع مسافات */}
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {fields.map((f, i) => (
            <Reveal key={f.num} delay={i * 0.06}>
              <a
                href="#cta"
                className="qamat-surface group flex h-full flex-col items-center justify-between gap-4 p-6 text-center sm:aspect-square sm:p-7"
              >
                {/* الرقم */}
                <span className="text-xs font-medium tracking-[0.2em] text-accent-strong">
                  {f.num}
                </span>

                {/* الاسم والوصف */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold leading-snug transition-colors duration-400 group-hover:text-primary sm:text-2xl">
                    {f.name}
                  </h3>
                  <p className="text-[0.82rem] leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </div>

                {/* السهم */}
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border transition-all duration-400 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                  <ArrowLeft className="size-4 transition-transform duration-400 group-hover:-translate-x-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}