import {
  featuredLeaders,
  featuredMembers,
  featuredMonth,
  type FeaturedLeader,
  type FeaturedMember,
} from "@/data/qamatData";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Crown, Star, User, Users, type LucideIcon } from "lucide-react";
import { Reveal, SectionLabel, WordsReveal } from "./Reveal";

/* =========================================================================
   صفحة متميزين الشهر
   -------------------------------------------------------------------------
   القسم الأول: القادة المتميزون  |  القسم الثاني: الأعضاء المتميزون
   البيانات كلها في src/data/qamatData.ts
   ========================================================================= */

/* عرض موحّد لكل البطاقات (قادة وأعضاء) — صغّره أو كبّره من هنا */
const CARD_W = "w-[8.75rem] sm:w-40";

/* ---------- الصورة: حلقة ذهبية + نجمة التميّز ---------- */
function GoldAvatar({
  name,
  photo,
  tone,
}: {
  name: string;
  photo?: string | undefined;
  tone: "dark" | "light";
}) {
  const dark = tone === "dark";

  return (
    <div className="relative">
      <div
        className="rounded-full p-[3px]"
        style={{
          background:
            "conic-gradient(from 140deg, #d9bf94, #a88d68 38%, rgba(201,171,126,0.3) 68%, #d9bf94)",
        }}
      >
        <div
          className={`grid size-16 place-items-center overflow-hidden rounded-full sm:size-[4.5rem] ${
            dark ? "bg-[#123b40]" : "bg-[#dfe9e5]"
          }`}
        >
          {photo ? (
            <img src={photo} alt={name} loading="lazy" className="size-full object-cover" />
          ) : (
            <User
              aria-hidden
              strokeWidth={1.3}
              className={`size-6 sm:size-7 ${dark ? "text-[#c9ab7e]" : "text-primary/70"}`}
            />
          )}
        </div>
      </div>

      <span
        aria-hidden
        className={`absolute -bottom-0.5 -end-0.5 grid size-6 place-items-center rounded-full bg-accent text-accent-foreground ring-[3px] ${
          dark ? "ring-[#17494e]" : "ring-[#eef3f1]"
        }`}
      >
        <Star className="size-3 fill-current" strokeWidth={0} />
      </span>
    </div>
  );
}

/* ---------- بطاقة القائد — نفس مقاس بطاقة العضو، بالهوية الغامقة ---------- */
function LeaderCard({ leader }: { leader: FeaturedLeader }) {
  return (
    <article
      className="surface-dark relative flex h-full w-full flex-col items-center gap-3 overflow-hidden rounded-[1.25rem] px-3 py-5 text-center transition-transform duration-500 hover:-translate-y-0.5"
      style={{
        border: "1px solid rgba(168,141,104,0.34)",
        backgroundColor: "#19474c",
        backgroundImage:
          "radial-gradient(circle at 50% 0%, rgba(168,141,104,0.3), transparent 60%), linear-gradient(160deg, #1b264a 0%, #19474c 55%, #123b40 100%)",
        boxShadow: "inset 0 1px 0 rgba(242,237,226,0.1), 0 10px 26px rgba(14,34,38,0.16)",
      }}
    >
      <GoldAvatar name={leader.name} photo={leader.photo} tone="dark" />

      <div className="space-y-1">
        <h3 className="text-sm font-semibold leading-snug">{leader.name}</h3>
        <p className="text-[0.7rem] leading-relaxed text-muted-foreground">{leader.dept}</p>
      </div>

      <span className="mt-auto rounded-full border border-accent/45 bg-accent/10 px-2.5 py-0.5 text-[0.66rem] leading-snug text-accent-strong">
        {leader.role}
      </span>
    </article>
  );
}

/* ---------- بطاقة العضو — فاتحة هادئة ---------- */
function MemberCard({ member }: { member: FeaturedMember }) {
  return (
    <article className="qamat-surface flex h-full w-full flex-col items-center gap-3 rounded-[1.25rem] px-3 py-5 text-center">
      <GoldAvatar name={member.name} photo={member.photo} tone="light" />

      <div className="space-y-1">
        <h3 className="text-sm font-semibold leading-snug">{member.name}</h3>
        <p className="text-[0.7rem] leading-relaxed text-muted-foreground">{member.dept}</p>
      </div>

      <span className="mt-auto rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[0.66rem] leading-snug text-accent-strong">
        {member.committee}
      </span>
    </article>
  );
}

/* ---------- عنوان القسم ---------- */
function SectionHead({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3.5 text-center">
      <Reveal>
        <span className="grid size-12 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent-strong">
          <Icon aria-hidden strokeWidth={1.6} className="size-5" />
        </span>
      </Reveal>
      <h2 className="text-[clamp(1.5rem,3.4vw,2.2rem)] font-semibold leading-[1.3]">
        <WordsReveal text={title} />
      </h2>
      <Reveal delay={0.1}>
        <p className="max-w-md text-sm leading-[1.9] text-muted-foreground">{desc}</p>
      </Reveal>
    </div>
  );
}

/* ---------- الصفحة ---------- */
export function FeaturedPage() {
  const { monthName, year } = featuredMonth;

  return (
    <section id="featured" className="py-14 md:py-20">
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
        <div className="mt-8 text-center md:mt-12">
          <SectionLabel>متميزين الشهر</SectionLabel>

          <h1 className="mx-auto mt-6 text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.25]">
            <WordsReveal text={`متميزو شهر ${monthName}`} />
          </h1>

          <Reveal delay={0.25}>
            <p className="mx-auto mt-4 max-w-md text-sm leading-loose text-muted-foreground sm:text-base">
              قادة وأعضاء تميّزوا بالتزامهم وجودة عملهم خلال الشهر
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-card/60 px-5 py-2 text-sm font-medium text-accent-strong">
              <CalendarDays aria-hidden className="size-[17px]" />
              {monthName} {year}
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <span aria-hidden className="qamat-gold-line mx-auto mt-9 block w-40" />
          </Reveal>
        </div>

        {/* ===== القسم الأول: القادة المتميزون ===== */}
        <div className="mt-16 md:mt-20">
          <SectionHead
            icon={Crown}
            title="القادة المتميزون"
            desc="من قادوا فرقهم بوضوح والتزام، وتركوا أثرًا يُلمس في العمل."
          />

          <div className="mx-auto mt-10 flex max-w-[46rem] flex-wrap justify-center gap-3 sm:gap-4 md:mt-12">
            {featuredLeaders.map((leader, i) => (
              <div key={`${leader.name}-${i}`} className={`flex ${CARD_W}`}>
                <Reveal delay={i * 0.08} className="flex w-full">
                  <LeaderCard leader={leader} />
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        {/* فاصل */}
        <div aria-hidden className="my-16 flex justify-center md:my-24">
          <span className="h-px w-full max-w-xs bg-border" />
        </div>

        {/* ===== القسم الثاني: الأعضاء المتميزون ===== */}
        <div>
          <SectionHead
            icon={Users}
            title="الأعضاء المتميزون"
            desc="أعضاء قدموا الكثير."
          />

          <div className="mx-auto mt-10 flex max-w-[46rem] flex-wrap justify-center gap-3 sm:gap-4 md:mt-12">
            {featuredMembers.map((m, i) => (
              <div key={`${m.name}-${i}`} className={`flex ${CARD_W}`}>
                <Reveal delay={(i % 4) * 0.07} className="flex w-full">
                  <MemberCard member={m} />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
