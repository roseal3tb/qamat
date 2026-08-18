import { ArrowUpLeft } from "lucide-react";
import { objectives } from "@/data/qamatData";
import { Reveal, SectionLabel, WordsReveal } from "./Reveal";

export function Objectives() {
  return (
    <section id="objectives" className="border-t border-border py-24 md:py-36">
      <div className="container-q">
        <SectionLabel>02 — أهداف المبادرة</SectionLabel>
        <h2 className="mt-8 max-w-[16ch] text-[clamp(1.9rem,4.4vw,3.5rem)] font-semibold leading-[1.2]">
          <WordsReveal text="نحو كفاءات أكثر جاهزية للمستقبل." />
        </h2>

        <div className="mt-14 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {objectives.map((o, i) => (
            <Reveal key={o.num} delay={(i % 3) * 0.08}>
              <div className="group relative h-full bg-background p-7 transition-colors duration-500 hover:bg-ink hover:text-ink-foreground md:p-9">
                <div className="flex items-start justify-between">
                  <span className="text-3xl font-semibold text-accent md:text-4xl">{o.num}</span>
                  <ArrowUpLeft className="size-5 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
                <h3 className="mt-10 text-lg font-medium leading-snug md:text-xl">{o.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-ink-muted">
                  {o.desc}
                </p>
                <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
