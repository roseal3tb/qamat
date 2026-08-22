import { Reveal, SectionLabel, WordsReveal } from "./Reveal";

/* =========================================================================
   الأعضاء المتميزون
   -------------------------------------------------------------------------
   عدّل القائمة أدناه. لإضافة صورة: ضعها في public/members/
   واكتب المسار في photo، مثال: photo: "/members/sara.png"
   ========================================================================= */

type Member = {
  name: string;
  track: string;
  photo?: string;
};

const featuredMembers: Member[] = [
  { name: "الاسم الكامل", track: "مسار الإعلام", photo: "" },
  { name: "الاسم الكامل", track: "مسار تحليل البيانات", photo: "" },
  { name: "الاسم الكامل", track: "المسار المالي", photo: "" },
  { name: "الاسم الكامل", track: "مسار التسويق", photo: "" },
  { name: "الاسم الكامل", track: "المسار التقني", photo: "" },
  { name: "الاسم الكامل", track: "مسار إدارة المخاطر", photo: "" },
];

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="qamat-surface flex w-[190px] shrink-0 flex-col items-center gap-3 p-5 text-center sm:w-[215px]">
      <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-full border border-border bg-muted">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <span className="text-xl font-semibold text-accent-strong" aria-hidden>
            {member.name.trim().charAt(0)}
          </span>
        )}
      </div>

      <div>
        <h4 className="text-[0.92rem] font-semibold leading-snug">{member.name}</h4>
        <p className="mt-1 text-[0.78rem] text-muted-foreground">{member.track}</p>
      </div>
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
            <WordsReveal text="وجوه صنعت الفرق في قامات." />
          </h2>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-loose text-muted-foreground">
              مشاركون تميّزوا في مساراتهم ومشاريعهم خلال البرنامج.
            </p>
          </Reveal>
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