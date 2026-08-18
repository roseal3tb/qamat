import { Reveal, SectionLabel, WordsReveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative border-t border-border py-24 md:py-36">
      <div className="container-q">
        <SectionLabel>01 — عن قامات</SectionLabel>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <h2 className="lg:col-span-7 text-[clamp(1.9rem,4.6vw,3.75rem)] font-semibold leading-[1.2]">
            <WordsReveal text="الكفاءة لا تُكتشف فقط،" />
            <br />
            <span className="text-accent">
              <WordsReveal text="بل تُبنى." delay={0.2} />
            </span>
          </h2>

          <div className="lg:col-span-5 lg:pt-4">
            <Reveal delay={0.1}>
              <p className="text-base leading-loose text-foreground/80 md:text-lg">
                قامات هي مبادرة نوعية تهدف إلى بناء وتمكين الكفاءات الشابة من خلال شراكات
                استراتيجية مع جهات رائدة لإنشاء برامج متخصصة في المجالات المهنية الواعدة.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 border-t border-border pt-6 text-base leading-loose text-muted-foreground">
                تهدف المبادرة إلى تطوير المهارات وتعزيز الجاهزية المهنية ونقل الخبرات العملية
                للمشاركين عبر تجارب تدريبية وتطبيقية تسهم في إعداد جيل من الكفاءات القادرة على
                صناعة الأثر والمنافسة في سوق العمل.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15} className="mt-16 md:mt-24">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-border md:grid-cols-4">
            {["تطوير المهارات", "الجاهزية المهنية", "نقل الخبرات", "بناء الكفاءات"].map((t, i) => (
              <div
                key={t}
                className="group bg-background px-5 py-8 transition-colors duration-300 hover:bg-ink hover:text-ink-foreground md:px-7 md:py-12"
              >
                <span className="block text-xs text-accent">{`0${i + 1}`}</span>
                <span className="mt-3 block text-sm font-medium md:text-lg">{t}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
