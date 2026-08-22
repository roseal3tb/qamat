import { Reveal, WordsReveal } from "./Reveal";

/**
 * سكشن الأثر — بدون أرقام.
 * حُذفت الإحصائيات لأن المبادرة جديدة ولا توجد أرقام فعلية بعد.
 * عند توفر الأرقام يمكن إعادة شبكة الإحصائيات هنا.
 */
export function Impact() {
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="container-q text-center">
        <h2 className="mx-auto max-w-[20ch] text-[clamp(1.9rem,4.6vw,3.2rem)] font-semibold leading-[1.25]">
          <WordsReveal text="نستثمر في الكفاءة، لنصنع أثرًا أبعد." />
        </h2>

        <Reveal delay={0.2}>
          <span aria-hidden className="qamat-gold-line mx-auto mt-9 block w-44" />
        </Reveal>
      </div>
    </section>
  );
}