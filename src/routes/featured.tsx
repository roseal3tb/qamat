import { FeaturedPage } from "@/components/qamat/FeaturedMembers";
import { Footer } from "@/components/qamat/Footer";
import { Navbar } from "@/components/qamat/Navbar";
import { createFileRoute } from "@tanstack/react-router";

const title = "ظ…طھظ…ظٹط²ظٹظ† ط§ظ„ط´ظ‡ط± | ظ‚ط§ظ…ط§طھ â€” QAMAT";
const description =
  "طھط¹ط±ظ‘ظپ ط¹ظ„ظ‰ ط§ظ„ظ‚ط§ط¯ط© ظˆط§ظ„ط£ط¹ط¶ط§ط، ط§ظ„ظ…طھظ…ظٹط²ظٹظ† ظپظٹ ظ…ط¨ط§ط¯ط±ط© ظ‚ط§ظ…ط§طھ.";

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
