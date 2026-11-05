import { journey } from "@/data/qamatData";
import { SectionLabel } from "./Reveal";

function StageCard({
  stage,
}: {
  stage: (typeof journey)[number];
}) {
  return (
    <article
      dir="rtl"
      className="group relative w-full min-w-0 overflow-hidden rounded-[14px] border border-[#23443F]/15 bg-[#FCFBF8] p-3.5 shadow-[0_4px_18px_rgba(35,55,48,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#23443F]/30 hover:shadow-lg sm:rounded-[28px] sm:bg-white/80 sm:p-6 md:p-7"
      style={{
        clipPath:
          "polygon(0 10px, 10px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))",
      }}
    >
      {/* الشطفات الهندسية */}
      <span className="absolute right-0 top-0 h-[3px] w-10 bg-[#23443F]/70 sm:hidden" />
      <span className="absolute bottom-0 left-0 h-[3px] w-7 bg-[#23443F]/50 sm:hidden" />

      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold text-[#A78C65] sm:text-xs">
          مرحلة
        </span>

        <span className="text-xl font-bold leading-none text-[#23443F] sm:text-3xl">
          {stage.num}
        </span>
      </div>

      <h3 className="mt-2 text-[13px] font-bold leading-6 text-[#23443F] sm:mt-3 sm:text-lg">
        {stage.title}
      </h3>

      {stage.subtitle && (
        <p className="mt-1 text-[10px] leading-5 text-[#778984] sm:mt-2 sm:text-sm sm:leading-7">
          {stage.subtitle}
        </p>
      )}

      <div className="my-2 h-px w-full bg-gradient-to-l from-[#23443F]/35 via-[#23443F]/15 to-transparent sm:my-4" />

      <ul className="space-y-1 sm:space-y-2.5">
        {stage.points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-1.5 text-[10px] leading-5 text-[#71817C] sm:gap-2 sm:text-sm sm:leading-7"
          >
            <span className="mt-[7px] size-1 shrink-0 rounded-full bg-[#23443F] sm:size-1.5" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <span className="absolute bottom-0 right-6 hidden h-[3px] w-0 rounded-full bg-[#23443F] transition-all duration-300 group-hover:w-16 sm:block" />
    </article>
  );
}

export function Journey() {
  return (
    <section
      id="journey"
      className="overflow-hidden border-t border-border py-16 sm:py-20 md:py-28"
    >
      <div className="container-q">
        {/* العنوان */}
        <div className="text-center">
          <SectionLabel>رحلة قامات</SectionLabel>

          <h2 className="mx-auto mt-6 max-w-[20ch] text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.3]">
            من أول خطوة... إلى أول أثر
          </h2>
        </div>

        {/* المراحل */}
        <div className="relative mx-auto mt-12 max-w-5xl sm:mt-16 md:mt-20">

          {/* مسار الجوال المنحني — تدرّج ذهبي/تيل */}
          <svg
            aria-hidden="true"
            viewBox="0 0 60 1000"
            preserveAspectRatio="none"
            className="pointer-events-none absolute bottom-0 right-0 top-0 h-full w-[48px] sm:w-[58px] md:hidden"
          >
            <defs>
              <linearGradient id="jgrad-m" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#19474C" />
                <stop offset="50%" stopColor="#A88D68" />
                <stop offset="100%" stopColor="#19474C" />
              </linearGradient>
            </defs>
            <path
              d="
                M 30 0
                C 30 65, 8 75, 8 155
                C 8 235, 52 245, 52 325
                C 52 405, 8 415, 8 495
                C 8 575, 52 585, 52 665
                C 52 745, 8 755, 8 835
                C 8 915, 30 925, 30 1000
              "
              fill="none"
              stroke="url(#jgrad-m)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.9"
            />
          </svg>

          {/* مسار اللابتوب المنحني — تدرّج ذهبي/تيل */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-0 hidden h-full w-[64px] -translate-x-1/2 md:block"
          >
            <defs>
              <linearGradient id="jgrad-d" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#19474C" />
                <stop offset="50%" stopColor="#A88D68" />
                <stop offset="100%" stopColor="#19474C" />
              </linearGradient>
            </defs>
            <path
              d="
                M 50 0
                C 50 100, 70 110, 70 200
                C 70 290, 30 310, 30 400
                C 30 490, 70 510, 70 600
                C 70 690, 30 710, 30 800
                C 30 890, 50 900, 50 1000
              "
              fill="none"
              stroke="url(#jgrad-d)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.9"
            />
          </svg>

          <div className="relative z-10 space-y-6 sm:space-y-8 lg:space-y-10">
            {journey.map((stage, index) => {
              const isRight = index % 2 === 0;
              const mobileOffset = index % 2 === 0;

              return (
                <div
                  key={stage.num}
                  className="relative grid grid-cols-[28px_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[36px_minmax(0,1fr)] sm:gap-5 md:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)] md:gap-0"
                >
                  {/* نقطة المسار */}
                  <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
                    <div className="relative z-10 flex size-7 items-center justify-center rounded-full border-[3px] border-[#A88D68] bg-[#E1E8E5] shadow-[0_0_0_5px_rgba(168,141,104,0.14)] sm:size-9">
                      <span className="size-2 rounded-full bg-[#19474C] sm:size-2.5" />
                    </div>
                  </div>

                  {/* بطاقة الجوال */}
                  <div
                    className={[
                      "col-start-2 row-start-1 min-w-0 transition-transform duration-500 md:hidden",
                      mobileOffset
                        ? "translate-x-0"
                        : "-translate-x-2 sm:-translate-x-3",
                    ].join(" ")}
                  >
                    <StageCard stage={stage} />
                  </div>

                  {/* البطاقة اليمنى للابتوب */}
                  <div
                    className={[
                      "hidden min-w-0 md:col-start-1 md:row-start-1 md:block",
                      !isRight ? "md:invisible" : "",
                    ].join(" ")}
                  >
                    {isRight && <StageCard stage={stage} />}
                  </div>

                  {/* البطاقة اليسرى للابتوب */}
                  <div
                    className={[
                      "hidden min-w-0 md:col-start-3 md:row-start-1 md:block",
                      isRight ? "md:invisible" : "",
                    ].join(" ")}
                  >
                    {!isRight && <StageCard stage={stage} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}