import { User } from "lucide-react";
import { Reveal, SectionLabel, WordsReveal } from "./Reveal";

/* =========================================================================
   الأعضاء المتميزون
   -------------------------------------------------------------------------
   لإضافة صورة: ضعها في public/members/ واكتب المسار في photo
   مثال: photo: "/members/shahad.png"
   ========================================================================= */

type Member = {
  name: string;
  dept: string;
  photo?: string;
};

const featuredMembers: Member[] = [
  { name: "شهد الشهري", dept: "إدارة الموارد البشرية", photo: "" },
  { name: "الجوري المطيري", dept: "إدارة الموارد البشرية", photo: "" },
  { name: "عمر الجريسي", dept: "إدارة الإعلام", photo: "" },
  { name: "فيصل الطريفي", dept: "إدارة الإعلام", photo: "" },
  { name: "دانه الزعيبي", dept: "إدارة الإعلام", photo: "" },
  { name: "ايلاف النشوان", dept: "إدارة الإعلام", photo: "" },
  { name: "ود التويجري", dept: "إدارة العلاقات العامة", photo: "" },
  { name: "صلاح الموسى", dept: "إدارة العلاقات العامة", photo: "" },
  { name: "عبدالرحمن الريس", dept: "إدارة العلاقات العامة", photo: "" },
];

/** لون لكل إدارة من هوية قامات */
const DEPT_TINTS: Record<string, string> = {
  "إدارة الموارد البشرية": "186 50% 20%",
  "إدارة الإعلام": "35 27% 53%",
  "إدارة العلاقات العامة": "226 47% 20%",
};

function MemberCard({ member }: { member: Member }) {
  const tint = DEPT_TINTS[member.dept] ?? "186 50% 20%";

  return (
    <div
      style={{ "--tint": `hsl(${tint})` } as Record<string, string>}
      className="qamat-surface flex w-[195px] shrink-0 flex-col items-center gap-3 rounded-[1.5rem] p-5 text-center sm:w-[220px]"
    >
      <div
        className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-full"
        style={{
          border: "1px solid color-mix(in srgb, var(--tint) 28%, transparent)",
          background: "color-mix(in srgb, var(--tint) 8%, transparent)",
        }}
      >
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <User aria-hidden strokeWidth={1.5} className="size-6" style={{ color: "var(--tint)" }} />
        )}
      </div>

      <div>
        <h4 className="text-[0.95rem] font-semibold leading-snug">{member.name}</h4>
        <p className="mt-1.5 text-[0.75rem] leading-relaxed text-muted-foreground">{member.dept}</p>
      </div>

      <span
        aria-hidden
        className="h-1 w-6 rounded-full"
        style={{ background: "color-mix(in srgb, var(--tint) 45%, transparent)" }}
      />
    </div>
  );
}

export function FeaturedMembers() {
  /* نكرّر القائمة مرتين حتى تكون اللفّة سلسة بلا قطع */
  const loop = [...featuredMembers, ...featuredMembers];

  return (
    <section
      id="featured-members"
      className="overflow-hidden border-t border-border py-24 md:py-32"
    >
      <div className="container-q">
        <div className="text-center">
          <SectionLabel>الأعضاء المتميزون</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-[22ch] text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.2]">
            <WordsReveal text="أسماء صنعت الفرق" />
          </h2>
        </div>
      </div>

      {/* الشريط المتحرك — يتوقف عند مرور المؤشر */}
      <Reveal delay={0.2}>
        <div className="marquee mt-14">
          <div className="marquee-track py-2">
            {loop.map((m, i) => (
              <MemberCard key={`${m.name}-${i}`} member={m} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
