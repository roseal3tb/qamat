import { CERT_BG } from "@/data/certBg";
import { type FeaturedPerson, featuredMonth } from "@/data/qamatData";
import { Check, Download, Link2, Linkedin, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* =========================================================================
   شهادة قامة الشهر — تصميم قامات الرسمي (Canva) كخلفية
   -------------------------------------------------------------------------
   • الخلفية مضمّنة داخل الكود (CERT_BG) — لا تحتاج أي ملف في public.
   • نركّب اسم العضو فقط (موسّطًا) ونغطّي الشرطات والنص الافتراضي.
   • التحميل يتم عبر canvas مباشرة — بدون أي مكتبة خارجية.
   ========================================================================= */

const ART_W = 1600;
const ART_H = 900;
const NAME_COLOR = "#284A5C";

/* موضع الاسم والتغطية (بمقاس 1600×900) */
const NAME_X = 762;
const NAME_Y = 535;
const NAME_SIZE = 56;
const COVER = { x: 470, y: 498, w: 512, h: 74 };

/* تحميل خط الاسم مرة واحدة */
function useDesignFonts() {
  useEffect(() => {
    const id = "qamat-cert-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

/* =========================================================================
   اللوحة (1600×900) — خلفية التصميم + اسم العضو
   ========================================================================= */
export function CertArtboard({ person }: { person: FeaturedPerson }) {
  return (
    <div
      dir="rtl"
      style={{ width: ART_W, height: ART_H, position: "relative", overflow: "hidden" }}
    >
      {/* خلفية التصميم الرسمي (مضمّنة) */}
      <img
        src={CERT_BG}
        alt="شهادة قامة الشهر"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* تغطية الشرطات + النص الافتراضي بالأبيض */}
      <div
        style={{
          position: "absolute",
          top: COVER.y,
          left: COVER.x,
          width: COVER.w,
          height: COVER.h,
          background: "#ffffff",
        }}
      />

      {/* اسم العضو — موسّط على السطر */}
      <div
        style={{
          position: "absolute",
          top: NAME_Y,
          left: NAME_X,
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          whiteSpace: "nowrap",
          fontFamily: "'Reem Kufi', sans-serif",
          fontSize: NAME_SIZE,
          fontWeight: 700,
          lineHeight: 1,
          color: NAME_COLOR,
        }}
      >
        {person.name}
      </div>
    </div>
  );
}

/* =========================================================================
   النافذة — عرض متجاوب + تحميل + مشاركة
   ========================================================================= */
export function CertificateModal({
  person,
  onClose,
}: {
  person: FeaturedPerson;
  onClose: () => void;
}) {
  useDesignFonts();
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const shareUrl =
    typeof window !== "undefined" ? `${window.location.origin}/featured?c=${person.id}` : "";
  const shareText = `من متميزي شهر ${featuredMonth.monthName} في مبادرة قامات 🌿 #قامات`;

  // تحجيم اللوحة لتناسب عرض النافذة
  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, el.clientWidth / ART_W));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = old;
    };
  }, [onClose]);

  // التحميل عبر canvas — بدون أي مكتبة
  async function download() {
    setDownloading(true);
    try {
      const s = 2; // دقة مضاعفة
      const canvas = document.createElement("canvas");
      canvas.width = ART_W * s;
      canvas.height = ART_H * s;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas غير مدعوم");

      // الخلفية
      const img = new Image();
      img.src = CERT_BG;
      await img.decode();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // تغطية الشرطات/النص الافتراضي
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(COVER.x * s, COVER.y * s, COVER.w * s, COVER.h * s);

      // الاسم
      try {
        await (document as Document).fonts.load(`700 ${NAME_SIZE * s}px 'Reem Kufi'`);
        await (document as Document).fonts.ready;
      } catch {
        /* تجاهل */
      }
      ctx.fillStyle = NAME_COLOR;
      ctx.font = `700 ${NAME_SIZE * s}px 'Reem Kufi', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.direction = "rtl";
      ctx.fillText(person.name, NAME_X * s, NAME_Y * s);

      const fileName = `شهادة-قامة-الشهر-${person.name}.png`;
      const blob: Blob = await new Promise((resolve, reject) =>
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob"))), "image/png"),
      );

      // الجوال (iOS/Android): قائمة المشاركة → "حفظ الصورة"
      const nav = navigator as Navigator & {
        canShare?: (data?: { files?: File[] }) => boolean;
        share?: (data: { files?: File[]; title?: string }) => Promise<void>;
      };
      const file = new File([blob], fileName, { type: "image/png" });
      if (nav.share && nav.canShare && nav.canShare({ files: [file] })) {
        try {
          await nav.share({ files: [file], title: "شهادة قامة الشهر" });
          return;
        } catch (e) {
          if ((e as { name?: string })?.name === "AbortError") return; // ألغى المستخدم
          // غير ذلك: نكمل للطريقة البديلة
        }
      }

      // اللاب/الديسكتوب: تحميل مباشر
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } catch (err) {
      console.error(err);
      alert("تعذّر تحميل الصورة، حاول مرة أخرى.");
    } finally {
      setDownloading(false);
    }
  }

  function shareX() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "noopener",
    );
  }
  function shareLinkedIn() {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "noopener",
    );
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* تجاهل */
    }
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-[rgba(14,34,38,0.72)] p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(e) => e.currentTarget === e.target && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative my-auto w-full max-w-4xl rounded-3xl bg-card p-4 shadow-2xl sm:p-6"
      >
        <button
          type="button"
          aria-label="إغلاق"
          onClick={onClose}
          className="absolute end-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:text-primary"
        >
          <X aria-hidden className="size-4" />
        </button>

        {/* معاينة الشهادة */}
        <div ref={boxRef} className="overflow-hidden rounded-2xl">
          <div style={{ position: "relative", width: "100%", height: ART_H * scale }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: ART_W,
                height: ART_H,
                transform: `scale(${scale})`,
                transformOrigin: "top right",
              }}
            >
              <CertArtboard person={person} />
            </div>
          </div>
        </div>

        {/* الأزرار */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={download}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 disabled:opacity-60"
          >
            <Download aria-hidden className="size-4" />
            {downloading ? "جاري التحضير..." : "تحميل الشهادة"}
          </button>

          <button
            type="button"
            onClick={shareX}
            aria-label="مشاركة على X"
            className="grid size-11 place-items-center rounded-full border border-border bg-background text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-accent-foreground"
          >
            <span className="text-sm font-bold">X</span>
          </button>
          <button
            type="button"
            onClick={shareLinkedIn}
            aria-label="مشاركة على LinkedIn"
            className="grid size-11 place-items-center rounded-full border border-border bg-background text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-accent-foreground"
          >
            <Linkedin aria-hidden className="size-[18px]" />
          </button>
          <button
            type="button"
            onClick={copyLink}
            aria-label="نسخ الرابط"
            className="grid size-11 place-items-center rounded-full border border-border bg-background text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-accent-foreground"
          >
            {copied ? (
              <Check aria-hidden className="size-[18px] text-primary" />
            ) : (
              <Link2 aria-hidden className="size-[18px]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}