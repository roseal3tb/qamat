import { audience } from "@/data/qamatData";
import { Reveal, WordsReveal } from "./Reveal";

export function Audience() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="container-q">
        <h2 className="max-w-[14ch] text-[clamp(1.8rem,4vw,3.25rem)] font-semibold leading-[1.2]">
          <WordsReveal text="لمن صُممت قامات؟" />
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audience.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <article className="group relative flex h-full flex-col justify-between overflow-hidden border border-border p-6 transition-all duration-500 hover:border-accent md:p-8">
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(-45deg, var(--border) 0 1px, transparent 1px 10px)",
                  }}
                  aria-hidden
                />
                <span className="relative text-xs tracking-[0.2em] text-accent">
                  0{i + 1}
                </span>
                <div className="relative mt-16">
                  <h3 className="text-lg font-medium leading-snug md:text-xl">{a.title}</h3>
                  {a.desc && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
