import { leadership, type Leader } from "@/data/qamatData";
import { Reveal, SectionLabel, WordsReveal } from "./Reveal";

function LeaderCard({ leader, tint }: { leader: Leader; tint: string }) {
  return (
    <article
      className="group relative w-[78vw] shrink-0 snap-center sm:w-auto"
      style={{ ["--tint" as string]: `hsl(${tint})` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden border border-border transition-colors duration-500 group-hover:border-[var(--tint)]">
        {leader.photo ? (
          <img
            src={leader.photo}
            alt={leader.name}
            loading="lazy"
            className="size-full object-cover grayscale transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:grayscale-0"
          />
        ) : (
          <div
            className="grid size-full place-items-center bg-secondary/50 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, var(--border) 0 1px, transparent 1px 12px)",
            }}
            aria-hidden
          >
            <span className="text-5xl font-semibold text-muted-foreground/50">
              {leader.name.trim().charAt(0)}
            </span>
          </div>
        )}

        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full"
          style={{ background: "var(--tint)" }}
        />
      </div>

      <div className="pt-4">
        <h4 className="text-lg font-medium leading-snug">{leader.name}</h4>
        <p
          className="mt-1 text-sm transition-colors duration-500"
          style={{ color: "var(--tint)" }}
        >
          {leader.role}
        </p>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="pt-2 text-sm leading-relaxed text-muted-foreground">
              {leader.desc || leader.committee}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Leadership() {
  return (
    <section id="leadership" className="border-t border-border py-24 md:py-36">
      <div className="container-q">
        <SectionLabel>07 — قاداتنا</SectionLabel>
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <h2 className="text-[clamp(1.9rem,4.4vw,3.5rem)] font-semibold leading-[1.2] lg:col-span-7">
            <WordsReveal text="قاداتنا" />
          </h2>
          <Reveal delay={0.15} className="lg:col-span-5 lg:pt-4">
            <p className="text-base leading-loose text-muted-foreground">
              الأشخاص خلف قامات، والفرق التي تصنع التجربة.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-16 md:space-y-24">
          {leadership.map((group, gi) => (
            <div key={group.committee}>
              <Reveal>
                <div className="flex items-center gap-4 border-b border-border pb-4">
                  <span
                    className="inline-block h-px w-10"
                    style={{ background: `hsl(${group.tint})` }}
                  />
                  <h3 className="text-xl font-medium md:text-2xl">{group.committee}</h3>
                  <span className="ms-auto text-xs tracking-[0.2em] text-muted-foreground">
                    0{gi + 1}
                  </span>
                </div>
              </Reveal>

              <div className="-mx-[max(1rem,calc((100vw-100%)/2))] mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1rem,calc((100vw-100%)/2))] pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
                {group.leaders.map((l, i) => (
                  <Reveal key={`${group.committee}-${i}`} delay={i * 0.08}>
                    <LeaderCard leader={l} tint={group.tint} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
