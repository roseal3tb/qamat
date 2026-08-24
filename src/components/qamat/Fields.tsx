import { ArrowLeft, Compass } from "lucide-react";
import { fields } from "@/data/qamatData";
import { Reveal, WordsReveal } from "./Reveal";
import { Link } from "@tanstack/react-router";

export function Fields() {
  return (
    <section id="fields" className="relative border-t border-[#15274E]/10 bg-[#FBFBFC] py-24 md:py-32">
      <div className="container-q">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#15274E]/5 text-[#15274E] mb-3">
              <Compass className="size-3.5" />
              المسارات التخصصية
            </span>
            <h2 className="text-[clamp(1.9rem,4.4vw,3.5rem)] font-bold leading-[1.2] text-[#15274E]">
              <WordsReveal text="اختر المسار الأقرب لطموحك" />
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#64748B] leading-relaxed">
            مجموعة متكاملة من المجالات والمسارات المصممة لتأهيلك وصقل خبراتك القيادية والعملية.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {fields.map((f, i) => (
            <Reveal key={f.num || i} delay={i * 0.06}>
              <Link
                to="/register"
                className="group relative flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#15274E]/30 hover:shadow-xl hover:shadow-[#15274E]/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-[#15274E]/5 text-xs font-bold text-[#15274E] group-hover:bg-[#15274E] group-hover:text-white transition-colors">
                      {f.num || `0${i + 1}`}
                    </span>
                    <span className="grid size-9 place-items-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 group-hover:border-[#15274E] group-hover:bg-[#15274E] group-hover:text-white">
                      <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#15274E] group-hover:text-[#1E3A8A] transition-colors">
                    {f.name}
                  </h3>
                  
                  <p className="mt-3 text-xs leading-relaxed text-[#64748B]">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 pt-4 border-t border-slate-100 text-xs font-semibold text-[#15274E] opacity-80 group-hover:opacity-100">
                  <span>سجل في هذا المسار</span>
                  <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
