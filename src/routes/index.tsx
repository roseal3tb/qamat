import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/qamat/Navbar";
import { Hero } from "@/components/qamat/Hero";
import { About } from "@/components/qamat/About";
import { Objectives } from "@/components/qamat/Objectives";
import { Audience } from "@/components/qamat/Audience";
import { Journey } from "@/components/qamat/Journey";
import { Fields } from "@/components/qamat/Fields";
import { Partners } from "@/components/qamat/Partners";
import { Outcomes } from "@/components/qamat/Outcomes";
import { Transformation } from "@/components/qamat/Transformation";
import { Leadership } from "@/components/qamat/Leadership";
import { Impact } from "@/components/qamat/Impact";
import { CTA } from "@/components/qamat/CTA";
import { Footer } from "@/components/qamat/Footer";

const title = "قامات | QAMAT — نبني الكفاءات، نصنع الخبرة، ونمكّن الأثر";
const description =
  "قامات مبادرة نوعية لتمكين الكفاءات الشابة عبر برامج تخصصية وتجارب تدريبية وتطبيقية بالشراكة مع جهات رائدة.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Objectives />
        <Audience />
        <Journey />
        <Fields />
        <Partners />
        <Outcomes />
        <Transformation />
        <Leadership />
        <Impact />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
