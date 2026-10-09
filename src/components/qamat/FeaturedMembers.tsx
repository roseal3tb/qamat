import {
  featuredDepartments,
  featuredMonth,
  featuredPeople,
  findFeaturedPerson,
  type FeaturedPerson,
} from "@/data/qamatData";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Crown, Sparkles, Star, Trophy, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CertificateModal } from "./FeaturedCertificate";
import { Reveal, WordsReveal } from "./Reveal";

/* =========================================================================
   صفحة متميزي الشهر
   • مقدمة بارزة + الإدارات المميزة (كروت) + الأشخاص (تُضغط فتفتح الشهادة)
   • الأعضاء: مجموعات حسب اللجنة (التقنية أولًا) — الاسم فقط، واللجنة عنوان من فوق
   ========================================================================= */

const DARK_GRAD =
  "radial-gradient(circle at 50% -10%, rgba(201,171,126,0.28), transparent 55%), linear-gradient(155deg, #1b2b4e 0%, #17464c 55%, #113a3f 100%)";

/* ---------- أفاتار بحلقة ذهبية ونجمة ---------- */
function Avatar({ name, photo }: { name: string; photo?: string }) {
  return (
    <div className="relative shrink-0">
      <div
        className="rounded-full p-[2.5px]"
        style={{
          background:
            "conic-gradient(from 140deg, #d9bf94, #a88d68 38%, rgba(201,171,126,0.3) 68%, #d9bf94)",
        }}
      >
        <div className="grid size-14 place-items-center overflow-hidden rounded-full bg-muted sm:size-16">
          {photo ? (
            <img src={photo} alt={name} loading="lazy" className="size-full object-cover" />
          ) : (
            <User aria-hidden strokeWidth={1.3} className="size-6 text-accent-strong sm:size-7" />
          )}
        </div>
      </div>
      <span
        aria-hidden
        className="absolute -bottom-0.5 -end-0.5 grid size-5 place-items-center rounded-full bg-accent text-accent-foreground ring-[3px] ring-card sm:size-6"
      >
        <Star className="size-[11px] fill-current sm:size-3" strokeWidth={0} />
      </span>
    </div>
  );
}

/* ---------- بطاقة قائد/نائب (اسم + منصب) ---------- */
function LeaderCard({ person, onOpen }: { person: FeaturedPerson; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="qamat-surface group flex h-full w-full flex-col items-center gap-3 rounded-[1.25rem] px-3 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
    >
      <Avatar name={person.name} photo={person.photo} />
      <div className="space-y-1">
        <h3 className="text-sm font-semibold leading-snug">{person.name}</h3>
        <p className="text-[0.7rem] leading-relaxed text-muted-foreground">{person.title}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1 text-[0.66rem] font-medium text-accent-strong opacity-80 transition-opacity group-hover:opacity-100">
        <Award className="size-3" />
        الشهادة
      </span>
    </button>
  );
}

/* ---------- بطاقة عضو (اسم فقط — بكرامة مثل القادة) ---------- */
function MemberCard({ person, onOpen }: { person: FeaturedPerson; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="qamat-surface group flex h-full w-full flex-col items-center gap-2.5 rounded-[1.25rem] px-3 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
    >
      <Avatar name={person.name} photo={person.photo} />
      <h3 className="text-sm font-semibold leading-snug">{person.name}</h3>
      <span className="mt-auto inline-flex items-center gap-1 text-[0.66rem] font-medium text-accent-strong opacity-80 transition-opacity group-hover:opacity-100">
        <Award className="size-3" />
        الشهادة
      </span>
    </button>
  );
}

/* ---------- عنوان قسم رئيسي ---------- */
function SectionHead({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof Star;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Reveal>
        <span className="grid size-12 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent-strong">
          <Icon aria-hidden strokeWidth={1.6} className="size-5" />
        </span>
      </Reveal>
      <h2 className="text-[clamp(1.4rem,3.4vw,2rem)] font-semibold leading-[1.3]">
        <WordsReveal text={title} />
      </h2>
      <Reveal delay={0.1}>
        <p className="max-w-md text-sm leading-[1.9] text-muted-foreground">{desc}</p>
      </Reveal>
    </div>
  );
}

/* ---------- عنوان فرعي خفيف ---------- */
function GroupLabel({ title }: { title: string }) {
  return (
    <Reveal>
      <div className="flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-gradient-to-l from-accent/50 to-transparent sm:w-16" />
        <span className="text-[0.82rem] font-semibold tracking-wide text-accent-strong sm:text-sm">
          {title}
        </span>
        <span className="h-px w-10 bg-gradient-to-r from-accent/50 to-transparent sm:w-16" />
      </div>
    </Reveal>
  );
}

/* ---------- شبكة بطاقات ---------- */
function CardGrid({
  people,
  variant,
  onOpen,
}: {
  people: FeaturedPerson[];
  variant: "leader" | "member";
  onOpen: (p: FeaturedPerson) => void;
}) {
  const Card = variant === "leader" ? LeaderCard : MemberCard;
  return (
    <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-3 sm:gap-4">
      {people.map((p, i) => (
        <Reveal
          key={p.id}
          delay={(i % 4) * 0.06}
          className="flex basis-[calc(50%-0.375rem)] sm:basis-[calc(33.333%-0.667rem)] lg:basis-[calc(25%-0.75rem)]"
        >
          <Card person={p} onOpen={() => onOpen(p)} />
        </Reveal>
      ))}
    </div>
  );
}

function Divider() {
  return (
    <div aria-hidden className="my-14 flex justify-center md:my-20">
      <span className="h-px w-full max-w-xs bg-border" />
    </div>
  );
}

const TECH_COMMITTEE = "لجنة التقنية";
const committeeOf = (p: FeaturedPerson) => p.title.split("·").pop()?.trim() || "أعضاء";

/* ---------- الصفحة ---------- */
export function FeaturedPage() {
  const { monthName, year } = featuredMonth;
  const [openId, setOpenId] = useState<string | null>(null);
  const person = findFeaturedPerson(openId);

  const leaders = featuredPeople.filter((p) => p.group === "leader");
  const deputies = featuredPeople.filter((p) => p.group === "deputy");
  const leadersAndDeputies = [...leaders, ...deputies];
  const committee = featuredPeople.filter((p) => p.group === "committee");

  // الأعضاء مجموعين حسب اللجنة — التقنية أولًا
  const memberGroups = useMemo(() => {
    const members = featuredPeople.filter((p) => p.group === "member");
    const order: string[] = [];
    members.forEach((p) => {
      const c = committeeOf(p);
      if (!order.includes(c)) order.push(c);
    });
    const sorted = [TECH_COMMITTEE, ...order.filter((c) => c !== TECH_COMMITTEE)].filter((c) =>
      order.includes(c),
    );
    return sorted.map((c) => ({
      committee: c,
      people: members.filter((p) => committeeOf(p) === c),
    }));
  }, []);

  // فتح الشهادة تلقائيًا من الرابط (?c=id)
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("c");
    if (id && findFeaturedPerson(id)) setOpenId(id);
  }, []);

  function open(p: FeaturedPerson) {
    setOpenId(p.id);
    window.history.replaceState(null, "", `${window.location.pathname}?c=${p.id}`);
  }
  function close() {
    setOpenId(null);
    window.history.replaceState(null, "", window.location.pathname);
  }

  return (
    <section id="featured" className="py-10 md:py-16">
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

        {/* ===== المقدمة البارزة ===== */}
        <Reveal>
          <div
            className="relative mt-8 overflow-hidden rounded-[2rem] px-6 py-14 text-center md:mt-10 md:py-20"
            style={{ backgroundImage: DARK_GRAD, border: "1px solid rgba(201,171,126,0.3)" }}
          >
            {/* زخارف نجمية */}
            <Sparkles
              aria-hidden
              className="absolute right-[12%] top-[22%] size-5 text-accent/40 md:size-7"
            />
            <Star
              aria-hidden
              className="absolute left-[14%] top-[30%] size-3 fill-accent/30 text-accent/30 md:size-4"
            />
            <Sparkles
              aria-hidden
              className="absolute bottom-[20%] left-[10%] size-4 text-accent/30 md:size-5"
            />

            <span className="mx-auto grid size-14 place-items-center rounded-2xl border border-accent/45 bg-white/5 text-accent sm:size-16">
              <Crown aria-hidden strokeWidth={1.5} className="size-7 sm:size-8" />
            </span>

            <p className="mt-5 text-xs font-semibold tracking-[0.35em] text-accent sm:text-sm">
              متميزو الشهر
            </p>
            <h1 className="mx-auto mt-3 text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.2] text-white">
              <WordsReveal text={`متميزو شهر ${monthName}`} />
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-loose text-white/70 sm:text-base">
              إدارات وقادة وأعضاء تميّزوا بالتزامهم وجودة عملهم خلال الشهر
            </p>
            <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-accent/50 bg-accent/15 px-5 py-2 text-sm font-semibold text-accent">
              {monthName} {year}
            </div>
          </div>
        </Reveal>

        {/* ===== الإدارات المميزة ===== */}
        <div className="mt-16 md:mt-24">
          <SectionHead
            icon={Trophy}
            title="الإدارات المميزة"
            desc="إدارات قدّمت أداءً متكاملًا تميّزت به خلال الشهر."
          />
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-3 sm:gap-4">
            {featuredDepartments.map((d, i) => (
              <Reveal
                key={d.name}
                delay={i * 0.08}
                className="flex basis-[calc(50%-0.375rem)] sm:basis-[calc(33.333%-0.667rem)]"
              >
                <article className="group relative flex h-full w-full flex-col items-center gap-2.5 overflow-hidden rounded-[1.25rem] border border-accent/25 bg-card px-3 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-lg">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
                  />
                  <span
                    className="grid size-11 place-items-center rounded-full text-accent"
                    style={{
                      backgroundImage: DARK_GRAD,
                      border: "1px solid rgba(201,171,126,0.4)",
                    }}
                  >
                    <Trophy aria-hidden strokeWidth={1.5} className="size-5" />
                  </span>
                  <h3 className="text-[0.82rem] font-semibold leading-snug">{d.name}</h3>
                  <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[0.62rem] font-medium text-accent-strong">
                    إدارة مميزة
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Divider />

        {/* ===== القادة والنواب وقادة اللجان ===== */}
        <SectionHead
          icon={Sparkles}
          title="القادة المتميزون"
          desc="من قادوا فرقهم بوضوح والتزام، وتركوا أثرًا يُلمس في العمل."
        />

        <div className="mt-10 space-y-11 md:space-y-14">
          <div>
            <GroupLabel title="قادة الإدارات ونوابهم" />
            <CardGrid people={leadersAndDeputies} variant="leader" onOpen={open} />
          </div>

          {committee.length > 0 && (
            <div>
              <GroupLabel title="قادة اللجان ونوابهم" />
              <CardGrid people={committee} variant="leader" onOpen={open} />
            </div>
          )}
        </div>

        <Divider />

        {/* ===== الأعضاء — مجموعات حسب اللجنة (التقنية أولًا) ===== */}
        <SectionHead
          icon={Star}
          title="الأعضاء المتميزون"
          desc="أعضاء كل لجنة قدّموا الكثير، واستحقوا أن يُحتفى بهم."
        />

        <div className="mx-auto mt-10 max-w-4xl space-y-11 md:space-y-14">
          {memberGroups.map((g) => (
            <div key={g.committee}>
              <GroupLabel title={g.committee} />
              <CardGrid people={g.people} variant="member" onOpen={open} />
            </div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-14 text-center text-sm leading-loose text-muted-foreground">
            إنجازك يستحق أن يُرى، شارك شهادتك واحتفِ بتميزك
          </p>
        </Reveal>
      </div>

      {/* نافذة الشهادة */}
      {person && <CertificateModal person={person} onClose={close} />}
    </section>
  );
}