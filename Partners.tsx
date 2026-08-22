import { partners } from "@/data/qamatData";
import { Reveal, SectionLabel, WordsReveal } from "./Reveal";

export function Partners() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="container-q">
        <SectionLabel>05 — الشراكات</SectionLabel>
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <h2 className="lg:col-span-7 text-[clamp(1.7rem,3.8vw,3rem)] font-semibold leading-[1.25]">
            <WordsReveal text="مع شركاء يعرفون السوق، نصنع تجربة أقرب للواقع." />
          </h2>
          <Reveal delay={0.15} className="lg:col-span-5 lg:pt-3">
            <p className="text-base leading-loose text-muted-foreground">
              يتم تنفيذ البرامج بالتعاون مع شركاء متخصصين لضمان جودة المحتوى وارتباطه باحتياجات
              سوق العمل.
            </p>
          </Reveal>
        </div>

        {/* جدار الشعارات — عناصر بديلة تُستبدل بالشعارات الفعلية */}
        <Reveal delay={0.1} className="mt-14">
          <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((p) => (
              <div
                key={p.name}
                className="group grid h-28 place-items-center bg-background transition-colors duration-500 hover:bg-ink md:h-36"
              >
                {p.logo ? (
                  <img src={p.logo} alt={p.name} className="max-h-10 opacity-70" />
                ) : (
                  <span className="text-xs tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-accent">
                    {p.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
