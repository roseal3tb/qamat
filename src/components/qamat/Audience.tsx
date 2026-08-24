import { audience } from "@/data/qamatData";
import { Reveal, WordsReveal } from "./Reveal";
import { Sparkles, Users } from "lucide-react";

export function Audience() {
  return (
    <section className="relative border-t border-[#15274E]/10 bg-white py-24 md:py-32">
      <div className="container-q">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#15274E]/5 text-[#15274E] mb-3">
              <Users className="size-3.5" />
              الفئات المستهدفة
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,3.25rem)] font-bold leading-[1.2] text-[#15274E]">
              <WordsReveal text="لمن صُممت قامات؟" />
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#64748B] leading-relaxed">
            تم تصميم مسارات قامات لتلبي تطلعات الشغوفين والراغبين في قيادة التغيير وصناعة أثر نوعي ومستدام.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audience.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-[#FBFBFC] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#15274E]/30 hover:bg-white hover:shadow-xl hover:shadow-[#15274E]/5">
                
                {/* Header card: Number & Accent */}
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-[#15274E] shadow-sm border border-slate-100 group-hover:bg-[#15274E] group-hover:text-white transition-colors duration-300">
                    0{i + 1}
                  </span>
                  <Sparkles className="size-4 text-slate-300 group-hover:text-[#15274E] transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="mt-12">
                  <h3 className="text-lg font-bold leading-snug text-[#15274E] group-hover:text-[#1E3A8A] transition-colors">
                    {a.title}
                  </h3>
                  {a.desc && (
                    <p className="mt-3 text-xs leading-relaxed text-[#64748B]">
                      {a.desc}
                    </p>
                  )}
                </div>

                {/* Bottom decorative bar */}
                <div className="mt-6 h-1 w-0 rounded-full bg-[#15274E] transition-all duration-500 group-hover:w-12" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
