import { isProgramOpen, type Program } from "@/data/qamatData";
import { useNow } from "@/hooks/use-program-open";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Clock, Lock, MapPin, type LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------
   العدّاد التنازلي
   الترتيب من اليسار: يوم ← ساعة ← دقيقة ← ثانية
   (الصفحة RTL، فنعكس المصفوفة ليأتي اليوم في أقصى اليسار)
   ------------------------------------------------------------------------- */
function Countdown({ deadline, now }: { deadline: string; now: number | null }) {
  const diff = now === null ? null : Math.max(0, new Date(deadline).getTime() - now);

  const units = [
    { label: "أيام", value: diff === null ? null : Math.floor(diff / 86_400_000) },
    { label: "ساعة", value: diff === null ? null : Math.floor((diff / 3_600_000) % 24) },
    { label: "دقيقة", value: diff === null ? null : Math.floor((diff / 60_000) % 60) },
    { label: "ثانية", value: diff === null ? null : Math.floor((diff / 1000) % 60) },
  ].reverse();

  return (
    <div className="mx-auto grid max-w-md grid-cols-4 gap-2.5 sm:gap-3">
      {units.map((u) => (
        <div
          key={u.label}
          className="flex flex-col items-center rounded-2xl border border-border/70 bg-muted/50 px-1 py-4 sm:py-5"
        >
          <span className="text-[1.6rem] font-semibold leading-none tabular-nums text-primary sm:text-[2rem]">
            {u.value === null ? "--" : String(u.value).padStart(2, "0")}
          </span>
          <span className="mt-2 text-[0.64rem] text-muted-foreground sm:text-xs">{u.label}</span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------
   معلومة صغيرة — تصير رابطًا إذا مُرّر href
   ------------------------------------------------------------------------- */
function InfoChip({
  Icon,
  text,
  href,
}: {
  Icon: LucideIcon;
  text: string;
  href?: string;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-medium sm:text-[0.8rem]";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`${base} transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-primary`}
      >
        <Icon aria-hidden className="size-3.5 text-accent-strong" strokeWidth={1.8} />
        <span className="underline decoration-dotted underline-offset-4">{text}</span>
      </a>
    );
  }

  return (
    <span className={base}>
      <Icon aria-hidden className="size-3.5 text-accent-strong" strokeWidth={1.8} />
      {text}
    </span>
  );
}

/* -------------------------------------------------------------------------
   كارد البرنامج
   ------------------------------------------------------------------------- */
export function ProgramCard({
  program,
  onRegister,
}: {
  program: Program;
  onRegister: () => void;
}) {
  const now = useNow(1000);
  const open = isProgramOpen(program, now ?? Date.now());

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="qamat-surface relative mx-auto w-full max-w-2xl overflow-hidden rounded-[1.75rem] p-7 text-center sm:p-10"
    >
      {/* خط ذهبي رفيع أعلى الكارد */}
      <span aria-hidden className="qamat-gold-line absolute inset-x-0 top-0" />

      {/* دفء ذهبي خفيف في الزاوية */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(168,141,104,0.16), transparent 68%)",
        }}
      />

      <div className="relative">
        {/* حالة التسجيل */}
        <span
          className={`inline-block rounded-full px-3.5 py-1 text-[0.68rem] font-semibold ${
            open ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          {open ? "التسجيل مفتوح" : "التسجيل مغلق"}
        </span>

        {/* شعار الشريك */}
        <span
          className="mx-auto mt-6 grid size-20 place-items-center overflow-hidden rounded-[1.25rem] shadow-[0_10px_26px_rgba(20,48,46,0.16)] ring-1 ring-border sm:size-24"
          style={{ background: program.partnerBg }}
        >
          <img
            src={program.partnerLogo}
            alt={program.partner}
            className="size-full object-contain"
          />
        </span>

        {/* الاسم والشراكة */}
        <h2 className="mt-5 text-[clamp(1.4rem,4vw,2rem)] font-semibold leading-snug">
          {program.name}
        </h2>
        <p className="mt-2 text-xs font-medium text-accent-strong sm:text-sm">
          بالشراكة مع {program.partner}
        </p>

        {/* الوصف */}
        <p className="mx-auto mt-5 max-w-xl text-sm leading-loose text-muted-foreground md:text-[0.95rem]">
          {program.description}
        </p>

        {/* المدة والمكان */}
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          <InfoChip Icon={CalendarDays} text={program.dates} />
          <InfoChip Icon={MapPin} text={program.location} href={program.mapsUrl} />
        </div>

        <span aria-hidden className="qamat-gold-line mx-auto my-8 block w-40" />

        {open ? (
          <>
            <p className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock aria-hidden className="size-3.5" strokeWidth={1.8} />
              متبقي على انتهاء التسجيل
            </p>

            <Countdown deadline={program.deadline} now={now} />

            <button
              type="button"
              onClick={onRegister}
              className="group mx-auto mt-8 flex w-full max-w-md items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-[0_10px_26px_rgba(20,48,46,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 md:text-base"
            >
              سجّل الآن
              <ArrowLeft
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
              />
            </button>

            <p className="mt-4 text-[0.7rem] text-muted-foreground">
              يُغلق التسجيل في {program.deadlineLabel}
            </p>
          </>
        ) : (
          <div className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-2xl border border-border/70 bg-muted/50 py-5 text-sm font-medium text-muted-foreground">
            <Lock aria-hidden className="size-4" />
            انتهى التسجيل في هذا البرنامج
          </div>
        )}
      </div>
    </motion.article>
  );
}