import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { isProgramOpen, type Program } from "@/data/qamatData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Info, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const STATUSES = ["طالب", "حديث تخرج", "متخرج"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "الاسم الكامل مطلوب"),
  email: z
    .string()
    .trim()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("بريد إلكتروني غير صحيح"),
  nationalId: z
    .string()
    .trim()
    .regex(/^[12]\d{9}$/, "رقم الهوية/الإقامة يجب أن يكون 10 أرقام"),
  phone: z
    .string()
    .trim()
    .regex(/^(05|5)\d{8}$/, "رقم جوال سعودي غير صحيح (مثال: 05xxxxxxxx)"),
  major: z.string().trim().min(1, "التخصص مطلوب"),
  status: z.enum(STATUSES, { message: "اختر حالتك الدراسية" }),
  commitment: z.boolean().refine((v) => v === true, {
    message: "يجب الإقرار بالالتزام لإكمال التسجيل",
  }),
});

type FormValues = z.infer<typeof schema>;

/* -------------------------------------------------------------------------
   بطاقة "انتهى التسجيل"
   ------------------------------------------------------------------------- */
export function ProgramClosed({ program }: { program: Program }) {
  return (
    <div className="qamat-surface mx-auto flex max-w-lg flex-col items-center gap-4 p-10 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-muted text-muted-foreground">
        <Lock aria-hidden className="size-6" />
      </span>
      <h2 className="text-xl font-semibold">انتهى التسجيل في البرنامج</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        أُغلق باب التسجيل في {program.deadlineLabel}. تابعنا لتعرف عن برامجنا القادمة
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------
   النموذج
   ------------------------------------------------------------------------- */
export function ProgramForm({
  program,
  onSubmitted,
}: {
  program: Program;
  /** يُستدعى بعد نجاح التسجيل — لإخفاء ترويسة الصفحة */
  onSubmitted?: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [closed, setClosed] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { commitment: false },
  });

  async function onSubmit(values: FormValues) {
    // حماية إضافية: لو انتهى الموعد والصفحة مفتوحة
    if (!isProgramOpen(program)) {
      setClosed(true);
      return;
    }

    try {
      const response = await fetch(program.sheetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          nationalId: values.nationalId,
          phone: values.phone,
          major: values.major,
          status: values.status,
          commitment: values.commitment,
        }),
      });

      const result = await response.json().catch(() => null);

      if (result?.status === "closed") {
        setClosed(true);
        return;
      }

      if (!response.ok || !result || result.status !== "ok") {
        throw new Error(result?.message || "لم يتم حفظ التسجيل");
      }

      toast.success("وصلنا طلبك!");
      setSubmitted(true);
      onSubmitted?.();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("تعذّر حفظ تسجيلك، يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.");
    }
  }

  if (closed) return <ProgramClosed program={program} />;

  if (submitted) {
    return (
      <div className="qamat-surface mx-auto flex max-w-lg flex-col items-center gap-4 p-10 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-accent text-accent-foreground">
          <Check aria-hidden className="size-6" />
        </span>
        <h2 className="text-xl font-semibold">خطوتك الأولى تمّت</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          سيتم مراجعة طلبك والتواصل معك
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mx-auto max-w-3xl">
      {/* البرنامج المختار */}
      <div className="mb-10 flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4">
        <span
          className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl"
          style={{ background: program.partnerBg }}
        >
          <img src={program.partnerLogo} alt="" className="size-full object-contain" />
        </span>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">البرنامج</p>
          <p className="mt-0.5 truncate text-sm font-semibold sm:text-base">{program.name}</p>
        </div>
      </div>

      {/* بيانات المتقدم */}
      <div>
        <h2 className="text-lg font-semibold sm:text-xl">بيانات المتقدم</h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="الاسم الكامل" required error={errors.name?.message}>
            <Input
              {...register("name")}
              className="qamat-dotted-yeh-input h-11 bg-white"
              placeholder="الاسم الكامل"
            />
          </Field>

          <Field label="البريد الإلكتروني" required error={errors.email?.message}>
            <Input
              {...register("email")}
              className="qamat-dotted-yeh-input h-11 bg-white"
              type="email"
              placeholder="example@email.com"
              dir="ltr"
            />
          </Field>

          <Field label="رقم الهوية" required error={errors.nationalId?.message}>
            <Input
              {...register("nationalId")}
              className="qamat-dotted-yeh-input h-11 bg-white"
              placeholder="1xxxxxxxxx"
              dir="ltr"
            />
          </Field>

          <Field label="رقم الجوال" required error={errors.phone?.message}>
            <Input
              {...register("phone")}
              className="qamat-dotted-yeh-input h-11 bg-white"
              type="tel"
              placeholder="05xxxxxxxx"
              dir="ltr"
            />
          </Field>

          <Field label="التخصص" required error={errors.major?.message}>
            <Input
              {...register("major")}
              className="qamat-dotted-yeh-input h-11 bg-white"
              placeholder="التخصص الدراسي"
            />
          </Field>
        </div>
      </div>

      {/* الحالة الدراسية */}
      <div className="mt-14">
        <h2 className="text-base font-semibold sm:text-lg">
          الحالة الدراسية
          <RequiredMark />
        </h2>

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              dir="rtl"
              className="mt-5 flex w-full flex-wrap justify-start gap-6"
            >
              {STATUSES.map((s) => (
                <label
                  key={s}
                  className="flex cursor-pointer items-center gap-2 text-sm font-medium"
                >
                  <RadioGroupItem value={s} />
                  {s}
                </label>
              ))}
            </RadioGroup>
          )}
        />
        {errors.status && (
          <p className="mt-1.5 text-xs text-destructive">{errors.status.message}</p>
        )}
      </div>

      {/* الإقرار بالالتزام */}
      <div className="mt-14">
        <h2 className="text-base font-semibold sm:text-lg">
          الإقرار بالالتزام
          <RequiredMark />
        </h2>

        <label
          className={`mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border bg-white p-4 transition-colors hover:border-primary sm:p-5 ${
            errors.commitment ? "border-destructive" : "border-border"
          }`}
        >
          <input
            type="checkbox"
            {...register("commitment")}
            className="mt-1 size-4 shrink-0 cursor-pointer accent-primary"
          />
          <span className="text-sm font-medium leading-relaxed">{program.commitmentText}</span>
        </label>
        {errors.commitment && (
          <p className="mt-1.5 text-xs text-destructive">{errors.commitment.message}</p>
        )}

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
          {program.commitmentNote}
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-14 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 md:text-base"
      >
        {isSubmitting && <Loader2 aria-hidden className="size-4 animate-spin" />}
        إرسال التسجيل
      </button>
    </form>
  );
}

function RequiredMark() {
  return (
    <span aria-hidden className="mr-1 text-destructive">
      *
    </span>
  );
}

function Field({
  label,
  required = false,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-1.5 block">
        {label}
        {required && <RequiredMark />}
      </Label>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}