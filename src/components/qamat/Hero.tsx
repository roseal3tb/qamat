import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import { brand } from "@/data/qamatData";
import { Link } from "@tanstack/react-router";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const line = "نبني الكفاءات، نصنع الخبرة، ونمكّن الأثر.";

  return (
    <section id="hero" ref={ref} className="relative min-h-[100svh] overflow-hidden bg-[#FBFBFC]">
      {/* خلفية وشبكة هادئة */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to left, rgba(21, 39, 78, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(21, 39, 78, 0.08) 1px, transparent 1px)",
            backgroundSize: "clamp(60px, 8vw, 120px) clamp(60px, 8vw, 120px)",
            maskImage: "radial-gradient(ellipse at 50% 50%, black, transparent 80%)",
          }}
        />

        {/* أعمدة قامات الصاعدة من الأسفل */}
        <div className="absolute bottom-0 left-[6%] hidden items-end gap-3 md:flex">
          {[42, 72, 108, 148, 190, 130].map((h, i) => (
            <motion.span
              key={i}
              initial={{ height: 0 }}
              animate={{ height: h }}
              transition={{
                duration: 1.2,
                delay: 0.8 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={i === 4 ? "w-[3px] bg-[#15274E]" : "w-[3px] bg-[#15274E]/20"}
            />
          ))}
        </div>

        {/* حركة صعود وظهور لوقو قامات الكحلي من الأسفل في الخلفية */}
        <motion.div
          initial={{ y: 150, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 0.08, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-10 left-[5%] hidden lg:block"
        >
          <img
            src="/logo.png"
            alt="قامات"
            className="h-[480px] w-auto object-contain select-none pointer-events-none"
          />
        </motion.div>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="container-q relative flex min-h-[100svh] flex-col justify-center pt-32 pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#15274E]/80"
        >
          <span className="inline-block h-px w-10 bg-[#15274E]" />
          مبادرة {brand.nameAr} — {brand.nameEn}
          <span className="mx-1 h-1 w-1 rounded-full bg-[#15274E]/70" />
          ٢٠٢٦
        </motion.div>

        {/* حركة صعود النصوص من الأسفل */}
        <h1 className="mt-8 max-w-[19ch] text-[clamp(2.6rem,7.4vw,6.4rem)] font-bold leading-[1.08] tracking-tight text-[#15274E]">
          {line.split(" ").map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.18em] -mb-[0.18em] align-bottom">
              <motion.span
                className={`inline-block ${w.includes("الأثر") ? "text-[#15274E]" : ""}`}
                initial={{ y: "1.2em", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}&nbsp;
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8 }}
          className="mt-8 max-w-2xl text-base leading-[1.95] text-[#334155] md:text-lg"
        >
          {brand.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            to="/register"
            className="group inline-flex items-center gap-3 rounded-md bg-[#15274E] px-8 py-4 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#1E3A8A]"
          >
            انضم إلينا
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </Link>
          <a
            href="#about"
            className="inline-flex items-center gap-3 rounded-md border border-[#15274E]/30 bg-white/60 px-8 py-4 text-sm font-semibold text-[#15274E] backdrop-blur-sm transition-all duration-300 hover:border-[#15274E] hover:bg-white"
          >
            اكتشف قامات
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.45, duration: 0.8 }}
          className="mt-14 hidden items-center gap-4 md:flex"
        >
          <span className="h-px w-14 bg-[#15274E]/40" />
          <span className="text-xs text-[#64748B]">نبني الكفاءة • نصنع الخبرة • نمكّن الأثر</span>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-8 left-5 flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-[#64748B] hover:text-[#15274E] transition-colors md:left-10"
        >
          اكتشف
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
