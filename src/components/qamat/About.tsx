import { Reveal, SectionLabel, WordsReveal } from "./Reveal";

/**
 * عن قامات — تعريف موجز بالمبادرة.
 * (حُذفت الأعمدة الأربعة لأنها تكرّر كروت قسم "الأهداف".)
 */
export function About() {
  return (
    <section id="about" className="border-t border-border py-20 md:py-28">
      <div className="container-q">
        {/* الترويسة */}
        <div className="text-center">
          <SectionLabel>عن قامات</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-[18ch] text-[clamp(1.9rem,4.6vw,3.4rem)] font-semibold leading-[1.25]">
            <WordsReveal text="الكفاءة لا تُكتشف فقط، بل تُبنى" />
          </h2>
        </div>

        {/* تعريف موجز */}
        <div className="mx-auto mt-10 max-w-2xl">
          <Reveal>
            <p className="text-center text-base leading-loose text-foreground/85 md:text-lg">
              قامات مبادرة نوعية تُمكّن الكفاءات الشابة من خوض تجربة مهنية حقيقية، عبر شراكات
              استراتيجية مع جهات رائدة وبرامج تخصصية في المجالات الواعدة — حيث تتحوّل المعرفة إلى
              ممارسة، والممارسة إلى أثرٍ ملموس.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <span aria-hidden className="qamat-gold-line mx-auto mt-9 block w-32" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}