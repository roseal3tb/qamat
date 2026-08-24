import { useRef } from "react";
import { Users2, ChevronRight, ChevronLeft } from "lucide-react";

interface LeadershipBox {
  category: string;
  members: string[];
}

const leadershipBoxes: LeadershipBox[] = [
  // 1. قادة المبادرة (أول ناس)
  {
    category: "قادة المبادرة",
    members: ["هيا آل شافي", "موسى العتيبي"],
  },

  // 2. اللجنة التقنية
  {
    category: "اللجنة التقنية",
    members: ["روز العتيبي", "بارعه"],
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="leadership" className="relative bg-[#FBFBFC] py-20">
      <div className="container-q mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#15274E]/5 text-[#15274E] mb-2">
              <Users2 className="size-3.5" />
              الهيكل القيادي
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#15274E]">
              قاماتنا
            </h2>
          </div>
          
          {/* أزرار التنقل اليدوي */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("right")}
              aria-label="السابق"
              className="grid size-10 place-items-center rounded-full bg-white text-[#15274E] shadow-sm transition-all hover:bg-slate-50 active:scale-95"
            >
              <ChevronRight className="size-5" />
            </button>
            <button
              onClick={() => scroll("left")}
              aria-label="التالي"
              className="grid size-10 place-items-center rounded-full bg-white text-[#15274E] shadow-sm transition-all hover:bg-slate-50 active:scale-95"
            >
              <ChevronLeft className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* شريط المربعات بدون أي أوتلاين أو نجوم */}
      <div className="container-q">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {leadershipBoxes.map((box, idx) => (
            <div
              key={idx}
              className="flex h-44 w-72 shrink-0 snap-start flex-col justify-between rounded-2xl bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-[#15274E]">
                  {box.category}
                </h3>
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
        </div>
      </div>
    </section>
  );
}
