import { motion } from "framer-motion";
import { outcomes } from "@/data/qamatData";
import { WordsReveal } from "./Reveal";
import { Award, CheckCircle2, TrendingUp } from "lucide-react";

export function Outcomes() {
  return (
    <section id="outcomes" className="relative border-t border-[#15274E]/10 bg-white py-24 md:py-32">
      <div className="container-q">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#15274E]/5 text-[#15274E] mb-3">
              <TrendingUp className="size-3.5" />
              أثر المبادرة
            </span>
            <h2 className="text-[clamp(1.9rem,4.4vw,3.5rem)] font-bold leading-[1.2] text-[#15274E]">
              <WordsReveal text="ماذا تترك قامات؟" />
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#64748B] leading-relaxed">
            مخرجات نوعية تُترجم المهارات إلى واقع عملي يُمكّن المشارك من قيادة مستقبله المهني بثقة.
          </p>
        </div>

        {/* Outcomes Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.title || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-[#FBFBFC] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#15274E]/30 hover:bg-white hover:shadow-xl hover:shadow-[#15274E]/5"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#15274E]/5 text-sm font-bold text-[#15274E] group-hover:bg-[#15274E] group-hover:text-white transition-colors">
                    {`0${i + 1}`}
                  </span>
                  <Award className="size-5 text-slate-300 group-hover:text-[#15274E] transition-colors" />
                </div>

                <h3 className="text-xl font-bold leading-snug text-[#15274E] group-hover:text-[#1E3A8A] transition-colors">
                  {o.title}
                </h3>

                <p className="mt-4 text-xs leading-relaxed text-[#64748B]">
                  {o.desc}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 pt-4 border-t border-slate-100 text-[11px] font-medium text-[#15274E]/70">
                <CheckCircle2 className="size-3.5 text-emerald-600" />
                <span>مخرج أساسي ومستدام</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
