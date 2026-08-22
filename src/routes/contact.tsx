import { Footer } from "@/components/qamat/Footer";
import { Navbar } from "@/components/qamat/Navbar";
import { Reveal, SectionLabel, WordsReveal } from "@/components/qamat/Reveal";
import { contact, socials } from "@/data/qamatData";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, Linkedin, Mail } from "lucide-react";

const title = "تواصل معنا | قامات — QAMAT";
const description =
  "دَعنا نصنع الأثر معاً — للاستفسارات الرسمية والشراكات، تواصل مع فريق مبادرة قامات.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

function SocialIcon({ name }: { name: string }) {
  if (name === "Instagram") return <Instagram className="size-5" />;
  if (name === "LinkedIn") return <Linkedin className="size-5" />;
  return <span className="text-base font-semibold leading-none">X</span>;
}

function ContactPage() {
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

            {/* الترويسة */}
            <div className="mt-10 text-center md:mt-14">
              <SectionLabel>تواصل معنا</SectionLabel>

              <h1 className="mx-auto mt-7 max-w-[20ch] text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.3]">
                <WordsReveal text={contact.headline} />
              </h1>

              <Reveal delay={0.25}>
                <p className="mx-auto mt-5 max-w-lg text-base leading-loose text-muted-foreground">
                  {contact.intro}
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <span aria-hidden className="qamat-gold-line mx-auto mt-10 block w-40" />
              </Reveal>
            </div>

            {/* البطاقتان */}
            <div className="mx-auto mt-14 grid max-w-3xl gap-5 md:mt-16 md:grid-cols-2">
              {/* البريد الإلكتروني */}
              <Reveal>
                <div className="qamat-surface flex h-full flex-col items-center gap-4 p-8 text-center">
                  <span className="grid size-12 place-items-center rounded-full border border-border bg-muted text-primary">
                    <Mail aria-hidden strokeWidth={1.6} className="size-5" />
                  </span>

                  <h2 className="text-lg font-semibold">{contact.emailLabel}</h2>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {contact.emailNote}
                  </p>

                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-auto inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110"
                  >
                    {contact.email}
                  </a>
                </div>
              </Reveal>

              {/* المنصات الرقمية */}
              <Reveal delay={0.12}>
                <div className="qamat-surface flex h-full flex-col items-center gap-4 p-8 text-center">
                  <span className="grid size-12 place-items-center rounded-full border border-border bg-muted text-primary">
                    <Instagram aria-hidden strokeWidth={1.6} className="size-5" />
                  </span>

                  <h2 className="text-lg font-semibold">{contact.socialLabel}</h2>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {contact.socialNote}
                  </p>

                  <div className="mt-auto flex items-center justify-center gap-3 pt-2">
                    {socials.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        aria-label={s.name}
                        target="_blank"
                        rel="noreferrer"
                        className="grid size-12 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-accent-foreground"
                      >
                        <SocialIcon name={s.name} />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}