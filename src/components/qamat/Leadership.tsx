import { motion } from "framer-motion";
import { Users2, Crown } from "lucide-react";
import { WordsReveal } from "./Reveal";

interface LeadershipBox {
  category: string;
  members: string[];
  highlight?: boolean;
}

const leadershipBoxes: LeadershipBox[] = [
  // 1. قادة المبادرة (أول ناس)
  {
    category: "قادة المبادرة",
    members: ["هيا آل شافي", "موسى العتيبي"],
    highlight: true,
  },

  // 2. اللجنة التقنية
  {
    category: "اللجنة التقنية",
    members: ["روز العتيبي", "بارعه"],
    highlight: true,
  },

  // 3. إدارة الموارد ولجانها
  {
    category: "إدارة الموارد",
    members: ["فيّ الشلوي", "رهف العريفي"],
  },
  {
    category: "لجنة الاستقطاب",
    members: ["فوز الغامدي"],
  },
  {
    category: "لجنة متابعة الأداء",
    members: ["عبدالرحمن الشنيفي"],
  },

  // 4. إدارة الإعلام والمحتوى ولجانها
  {
    category: "إدارة الإعلام والمحتوى",
    members: ["حلا خالد حملي", "جود العجيمي"],
  },
  {
    category: "لجنة كتابة المحتوى والتسويق",
    members: ["حنين الصالحي", "وسن الجهني"],
  },
  {
    category: "لجنة التصاميم",
    members: ["شهد سعود"],
  },
  {
    category: "لجنة التصوير والمونتاج",
    members: ["طلال الصالح"],
  },

  // 5. إدارة العلاقات العامة ولجانها
  {
    category: "إدارة العلاقات العامة",
    members: ["صبا العجمي", "غيدا العصيمي"],
  },
  {
    category: "لجنة الشراكات",
    members: ["دانة الصالح"],
  },
  {
    category: "لجنة التعاونات",
    members: ["نوف العتيبي"],
  },

  // 6. إدارة التشغيل والتطوير
  {
    category: "إدارة التشغيل والتطوير",
    members: ["بندر الحرامله"],
  },
];

export function Leadership() {
  const duplicatedBoxes = [...leadershipBoxes, ...leadershipBoxes];

  return (
    <section id="leadership" className="relative border-t border-[#15274E]/10 bg-[#FBFBFC] py-24 md:py-32 overflow-hidden">
      <div className="container-q mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#15274E]/5 text-[#15274E] mb-3">
              <Users2 className="size-3.5" />
              الهيكل القيادي
            </span>
            <h2 className="text-[clamp(1.9rem,4.4vw,3.5rem)] font-bold leading-[1.2] text-[#15274E]">
              <WordsReveal text="قاماتنا" />
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#64748B] leading-relaxed">
            قادة المبادرة والفرق التنفيذية القائمة على قيادة التجربة وصناعة الأثر.
          </p>
        </div>
      </div>

      {/* شريط المربعات المتحرك من اليسار إلى اليمين */}
      <div className="relative w-full overflow-hidden py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#FBFBFC] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#FBFBFC] to-transparent" />

        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          dir="ltr"
        >
          {duplicatedBoxes.map((box, idx) => (
            <div
              key={idx}
              dir="rtl"
              className={`flex h-44 w-72 flex-col justify-between rounded-2xl p-6 transition-all duration-300 shadow-sm ${
                box.highlight
                  ? "border-2 border-[#15274E] bg-white shadow-md shadow-[#15274E]/10"
                  : "border border-slate-200/90 bg-white hover:border-[#15274E]/30 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-[#15274E]">
                  {box.category}
                </h3>
                {box.highlight && (
                  <Crown className="size-4 text-amber-600" />
                )}
              </div>

              <div className="flex flex-col gap-1.5 pt-2">
                {box.members.map((name, i) => (
                  <span
                    key={i}
                    className="text-sm font-semibold text-slate-800"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
