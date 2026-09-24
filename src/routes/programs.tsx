import { Footer } from "@/components/qamat/Footer";
import { Navbar } from "@/components/qamat/Navbar";
import { ProgramCard } from "@/components/qamat/ProgramCard";
import { ProgramForm } from "@/components/qamat/ProgramForm";
import { Reveal, SectionLabel, WordsReveal } from "@/components/qamat/Reveal";
import { programs, programsInfo } from "@/data/qamatData";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays } from "lucide-react";
import { useState } from "react";

const title = "البرامج | قامات — QAMAT";
const description = programsInfo.intro;

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const selected = programs.find((p) => p.id === selectedId) ?? null;

  function openForm(id: string) {
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToList() {
    setSelectedId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 md:pt-28">
        <section className="py-16 md:py-24">
          <div className="container-q">
            {/* الرجوع: للبرامج أثناء تعبئة النموذج، وللرئيسية في باقي الحالات */}
            <Reveal>
              {selected && !done ? (
                <button
                  type="button"
                  onClick={backToList}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowRight aria-hidden className="size-4" />
                  العودة للبرامج
                </button>
              ) : (
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowRight aria-hidden className="size-4" />
                  العودة للرئيسية
                </Link>
              )}
            </Reveal>

            {/* الترويسة — تختفي بعد نجاح التسجيل */}
            <div className={`mt-10 text-center md:mt-14 ${done ? "hidden" : ""}`}>
              <SectionLabel>{programsInfo.label}</SectionLabel>

              <h1 className="mx-auto mt-7 max-w-[22ch] text-[clamp(1.9rem,4.8vw,3.2rem)] font-semibold leading-[1.3]">
                <WordsReveal
                  text={selected ? programsInfo.formHeadline : programsInfo.headline}
                />
              </h1>

              <Reveal delay={0.25}>
                <p className="mx-auto mt-5 max-w-lg text-base leading-loose text-muted-foreground">
                  {selected ? programsInfo.formIntro : programsInfo.intro}
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <span aria-hidden className="qamat-gold-line mx-auto mt-10 block w-40" />
              </Reveal>
            </div>

            {/* المحتوى */}
            <div className="mt-14 md:mt-16">
              {selected ? (
                <ProgramForm program={selected} onSubmitted={() => setDone(true)} />
              ) : programs.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {programs.map((p) => (
                    <ProgramCard key={p.id} program={p} onRegister={() => openForm(p.id)} />
                  ))}
                </div>
              ) : (
                <div className="qamat-surface mx-auto flex max-w-lg flex-col items-center gap-4 p-10 text-center">
                  <span className="grid size-14 place-items-center rounded-full bg-muted text-muted-foreground">
                    <CalendarDays aria-hidden className="size-6" />
                  </span>
                  <h2 className="text-xl font-semibold">لا توجد برامج مفتوحة حاليًا</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    تابعنا لتعرف عن برامجنا القادمة
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}