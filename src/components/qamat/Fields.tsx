import { ArrowLeft } from "lucide-react";
import { fields } from "@/data/qamatData";
import { Reveal, SectionLabel, WordsReveal } from "./Reveal";

export function Fields() {
  return (
    <section id="fields" className="border-t border-border py-24 md:py-36">
      <div className="container-q">
        <SectionLabel>04 — المجالات</SectionLabel>
        <h2 className="mt-8 max-w-[16ch] text-[clamp(1.9rem,4.4vw,3.5rem)] font-semibold leading-[1.2]">
          <WordsReveal text="اختر المسار الأقرب لطموحك." />
        </h2>

        <div className="mt-14 border-t border-border">
          {fields.map((f, i) => (
            <Reveal key={f.num} delay={i * 0.05}>
              <a
                href="#cta"
                className="group relative flex items-center gap-5 border-b border-border py-7 transition-colors duration-500 md:gap-10 md:py-10"
              >
                <span className="relative z-10 w-10 shrink-0 text-sm text-accent md:text-base">
                  {f.num}
                </span>
                <div className="relative z-10 flex flex-1 flex-col gap-1 md:flex-row md:items-baseline md:gap-10">
                  <h3 className="text-2xl font-semibold transition-transform duration-500 group-hover:-translate-x-2 md:text-4xl">
                    {f.name}
                  </h3>
                  <p className="text-sm text-muted-foreground md:max-w-md">{f.desc}</p>
                </div>
                <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-border transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground md:size-12">
                  <ArrowLeft className="size-4" />
                </span>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-secondary/60 transition-all duration-500 group-hover:h-full" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
