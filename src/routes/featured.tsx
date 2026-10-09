import { FeaturedPage } from "@/components/qamat/FeaturedMembers";
import { Footer } from "@/components/qamat/Footer";
import { Navbar } from "@/components/qamat/Navbar";
import { createFileRoute } from "@tanstack/react-router";

const title = "متميزو الشهر | قامات — QAMAT";
const description = "تعرّف على القادة والأعضاء المتميزين في مبادرة قامات.";

export const Route = createFileRoute("/featured")({
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
  component: FeaturedRoute,
});

function FeaturedRoute() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-28">
        <FeaturedPage />
      </main>
      <Footer />
    </div>
  );
}