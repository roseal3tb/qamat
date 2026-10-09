import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/qamat/Navbar";
import { Leadership } from "@/components/qamat/Leadership";
import { Footer } from "@/components/qamat/Footer";

const title = "قاماتنا | قامات — QAMAT";
const description =
  "لأن الكفاءات لا تُبنى إلا بأيدي كفاءات — تعرّف على فريق مبادرة قامات وقادة إداراتها ولجانها.";

export const Route = createFileRoute("/team")({
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
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 md:pt-28">
        <Leadership />
      </main>
      <Footer />
    </div>
  );
}