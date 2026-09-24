import { isProgramOpen, programs, type Program } from "@/data/qamatData";
import { useEffect, useState } from "react";

/**
 * الوقت الحالي بالمللي ثانية، يتحدّث كل intervalMs.
 * يرجع null قبل التحميل في المتصفح — حتى يطابق ما يرسمه الخادم ما يرسمه المتصفح.
 */
export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return now;
}

/** هل التسجيل في هذا البرنامج مفتوح؟ يُغلق تلقائيًا لحظة انتهاء الموعد. */
export function useProgramOpen(program: Program, intervalMs = 1000) {
  const now = useNow(intervalMs);
  return isProgramOpen(program, now ?? Date.now());
}

/** البرامج المفتوح تسجيلها حاليًا — للشارة في الهيرو. */
export function useOpenPrograms(intervalMs = 30_000) {
  const now = useNow(intervalMs);
  const t = now ?? Date.now();
  return programs.filter((p) => isProgramOpen(p, t));
}