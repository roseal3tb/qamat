import { About } from "@/components/qamat/About";
import { Audience } from "@/components/qamat/Audience";
import { CTA } from "@/components/qamat/CTA";
import { FeaturedMembers } from "@/components/qamat/FeaturedMembers";
import { Fields } from "@/components/qamat/Fields";
import { Footer } from "@/components/qamat/Footer";
import { Hero } from "@/components/qamat/Hero";
import { Impact } from "@/components/qamat/Impact";
import { Journey } from "@/components/qamat/Journey";
import { Navbar } from "@/components/qamat/Navbar";
import { Objectives } from "@/components/qamat/Objectives";
import { Outcomes } from "@/components/qamat/Outcomes";
import { Partners } from "@/components/qamat/Partners";
import { Transformation } from "@/components/qamat/Transformation";
import { createFileRoute } from "@tanstack/react-router";

const title = "قامات | QAMAT — نبني الكفاءات، نصنع الخبرة، ونمكّن الأثر";
const description =
  "قامات مبادرة نوعية لتمكين الكفاءات الشابة عبر برامج تخصصية وتجارب تدريبية وتطبيقية بالشراكة مع جهات رائدة";

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
        <Impact />
        <FeaturedMembers />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
