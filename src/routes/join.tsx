import { Footer } from "@/components/qamat/Footer";
import { JoinCommitteeTree } from "@/components/qamat/JoinCommitteeTree";
import { JoinForm } from "@/components/qamat/JoinForm";
import { Navbar } from "@/components/qamat/Navbar";
import { Reveal, SectionLabel, WordsReveal } from "@/components/qamat/Reveal";
import { joinInfo } from "@/data/qamatData";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const title = "انضم إلينا | قامات — QAMAT";
const description = "اختر اللجنة التي تناسبك ثم سجّل بياناتك للانضمام إلى مبادرة قامات.";

export const Route = createFileRoute("/join")({
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
  component: JoinPage,
});

type SelectedCommittee = {
  department: string;
  committee: string;
};

function JoinPage() {
  const [selected, setSelected] = useState<SelectedCommittee | null>(null);

  function continueToForm(department: string, committee: string) {
    setSelected({ department, committee });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToTree() {
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 md:pt-28">
        <section className="py-16 md:py-24">
          <div className="container-q">
            <Reveal>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowRight aria-hidden className="size-4" />
                العودة للرئيسية
              </Link>
            </Reveal>

            <div className="mt-10 text-center md:mt-14">
              <SectionLabel>انضم إلينا</SectionLabel>

              <h1 className="mx-auto mt-7 max-w-[22ch] text-[clamp(1.9rem,4.8vw,3.2rem)] font-semibold leading-[1.3]">
                <WordsReveal text={selected ? "أكمل بيانات انضمامك" : joinInfo.headline} />
              </h1>

              <Reveal delay={0.25}>
                <p className="mx-auto mt-5 max-w-lg text-base leading-loose text-muted-foreground">
                  {selected
                    ? "عبّئ بياناتك الجامعية لإكمال طلب الانضمام."
                    : joinInfo.intro}
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <span aria-hidden className="qamat-gold-line mx-auto mt-10 block w-40" />
              </Reveal>
            </div>

            <div className="mt-14 md:mt-16">
              {selected ? (
                <JoinForm
                  selectedDepartment={selected.department}
                  selectedCommittee={selected.committee}
                  onBack={backToTree}
                />
              ) : (
                <JoinCommitteeTree onContinue={continueToForm} />
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
