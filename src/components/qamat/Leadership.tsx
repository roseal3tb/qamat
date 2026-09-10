import { departments, founders, teamIntro, type Department, type Leader } from "@/data/qamatData";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Cpu,
  Megaphone,
  Settings,
  Share2,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Reveal, SectionLabel, WordsReveal } from "./Reveal";

/* أيقونة كل إدارة */
const DEPT_ICONS: Record<string, LucideIcon> = {
  "إدارة الموارد البشرية": Users,
  "اللجنة التقنية": Cpu,
  "إدارة الإعلام والمحتوى": Megaphone,
  "إدارة العلاقات العامة": Share2,
  "إدارة التشغيل والتطوير": Settings,
};

/* -------------------------------------------------------------------------
   كارد الشخص — مصغر لجميع المقاسات
   ------------------------------------------------------------------------- */
function LeaderCard({
  leader,
  tint,
  size = "sm",
}: {
  leader: Leader;
  tint: string;
  size?: "sm" | "md";
}) {
  const big = size === "md";

  return (
    <article
      className={`group ${big ? "w-[170px] sm:w-[185px]" : "w-[135px] sm:w-[155px]"}`}
      style={{ "--tint": `hsl(${tint})` } as Record<string, string>}
    >
      <div className="qamat-surface relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden p-3.5 text-center sm:p-4">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[2.5px] origin-center scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
          style={{ background: "var(--tint)" }}
        />

        <div
          className={`grid shrink-0 place-items-center overflow-hidden rounded-full transition-transform duration-500 group-hover:scale-105 ${
            big ? "size-12 sm:size-14" : "size-10 sm:size-11"
          }`}
          style={{
            border: "1px solid color-mix(in srgb, var(--tint) 32%, transparent)",
            background: "color-mix(in srgb, var(--tint) 7%, transparent)",
          }}
        >
          {leader.photo ? (
            <img
              src={leader.photo}
              alt={leader.name}
              loading="lazy"
              className="size-full object-cover"
            />
          ) : (
            <User
              aria-hidden
              strokeWidth={1.5}
              className={big ? "size-6 sm:size-7" : "size-4 sm:size-5"}
              style={{ color: "var(--tint)" }}
            />
          )}
        </div>

        <div className="min-w-0">
          <h4 className={`font-semibold leading-tight ${big ? "text-sm sm:text-base" : "text-[0.78rem] sm:text-xs"}`}>
            {leader.name}
          </h4>
          <p
            className={`mt-1 leading-normal text-muted-foreground ${
              big ? "text-xs" : "text-[0.68rem] sm:text-[0.72rem]"
            }`}
          >
            {leader.role}
          </p>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------
   كتلة الإدارة
   ------------------------------------------------------------------------- */
function DepartmentBlock({ dept }: { dept: Department }) {
  const Icon = DEPT_ICONS[dept.name] ?? Users;
  const tintColor = `hsl(${dept.tint})`;

  return (
    <div>
      <Reveal>
        <div className="flex flex-col items-center gap-2.5 text-center">
          <span
            className="grid size-10 place-items-center rounded-full sm:size-11"
            style={{
              border: `1px solid color-mix(in srgb, ${tintColor} 30%, transparent)`,
              background: `color-mix(in srgb, ${tintColor} 8%, transparent)`,
            }}
          >
            <Icon aria-hidden strokeWidth={1.6} className="size-4 sm:size-5" style={{ color: tintColor }} />
          </span>
          <h3 className="text-base font-semibold sm:text-lg">{dept.name}</h3>
          <span
            aria-hidden
            className="h-px w-12 sm:w-16"
            style={{
              background: `linear-gradient(90deg, transparent, ${tintColor}, transparent)`,
            }}
          />
        </div>
      </Reveal>

      {/* قيادة الإدارة */}
      <div className="mt-6 flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
        {dept.leadership.map((leader, i) => (
          <Reveal key={leader.name} delay={i * 0.08}>
            <LeaderCard leader={leader} tint={dept.tint} size="md" />
          </Reveal>
        ))}
      </div>

      {/* قادة اللجان */}
      {dept.committees.length > 0 && (
        <div className="mt-3.5 flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
          {dept.committees.map((leader, i) => (
            <Reveal key={leader.name} delay={i * 0.06}>
              <LeaderCard leader={leader} tint={dept.tint} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   الصفحة
   ------------------------------------------------------------------------- */
export function Leadership() {
  return (
    <section id="leadership" className="py-14 md:py-20">
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

        {/* العبارة الافتتاحية */}
        <div className="mt-8 text-center md:mt-12">
          <SectionLabel>قاماتنا</SectionLabel>

          <h1 className="mx-auto mt-6 max-w-[26ch] text-[clamp(1.6rem,4vw,2.6rem)] font-semibold leading-[1.4]">
            <WordsReveal text={teamIntro.line} />
            <br />
            <span className="text-accent-strong">
              <WordsReveal text={teamIntro.highlight} delay={0.3} />
            </span>
          </h1>

          <Reveal delay={0.5}>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-loose text-muted-foreground sm:text-base">
              الأشخاص خلف قامات، والفرق التي تصنع التجربة
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <span aria-hidden className="qamat-gold-line mx-auto mt-8 block w-32" />
          </Reveal>
        </div>

        {/* قيادة المبادرة */}
        <div className="mt-12 flex flex-wrap items-stretch justify-center gap-3 sm:gap-4 md:mt-16">
          {founders.map((leader, i) => (
            <Reveal key={leader.name} delay={i * 0.08}>
              <LeaderCard leader={leader} tint="35 27% 53%" size="md" />
            </Reveal>
          ))}
        </div>

        {/* الإدارات */}
        <div className="mt-16 md:mt-20">
          {departments.map((dept, i) => (
            <div key={dept.name}>
              {i > 0 && (
                <div aria-hidden className="my-12 flex justify-center md:my-16">
                  <span className="h-px w-full max-w-xs bg-border" />
                </div>
              )}
              <DepartmentBlock dept={dept} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
