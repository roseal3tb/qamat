import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { joinDepartments, joinFileRequiredDepartment } from "@/data/qamatData";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Loader2, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwJk_q0fSD6YIraU7xr0RNOHGc9VifA9XPTv1JoGrRTUcP2G3O3THZWT5ApBY1HGLNg/exec";

const MAX_FILE_MB = 10;
const MAX_FILES = 5;

const schema = z
  .object({
    name: z.string().trim().min(2, "الاسم مطلوب"),
    email: z.string().trim().min(1, "البريد الإلكتروني مطلوب").email("بريد إلكتروني غير صحيح"),
    universityId: z.string().trim().min(1, "الرقم الجامعي مطلوب"),
    phone: z
      .string()
      .trim()
      .regex(/^(05|5)\d{8}$/, "رقم جوال سعودي غير صحيح (مثال: 05xxxxxxxx)"),
    nationalId: z
      .string()
      .trim()
      .regex(/^[12]\d{9}$/, "رقم الهوية/الإقامة يجب أن يكون 10 أرقام"),
    university: z.string().trim().min(1, "الجامعة مطلوبة"),
    major: z.string().trim().min(1, "التخصص مطلوب"),
    department: z.string().min(1, "اختر الإدارة"),
    committee: z.string().min(1, "اختر اللجنة"),
    previousClub: z.enum(["yes", "no"], { message: "اختر إجابة" }),
    previousClubExperience: z.string().trim().optional(),
    previousClubSkills: z.string().trim().min(2, "اذكر خبراتك، أو اكتب لا توجد"),
  })
  .refine((v) => joinDepartments.some((d) => d.name === v.department), {
    message: "اختر الإدارة",
    path: ["department"],
  })
  .refine((v) => v.previousClub !== "yes" || (v.previousClubExperience?.length ?? 0) >= 2, {
    message: "اذكر دورك وتجربتك في النادي",
    path: ["previousClubExperience"],
  });

type FormValues = z.infer<typeof schema>;

export function JoinForm({
  selectedDepartment,
  selectedCommittee,
  onBack,
}: {
  selectedDepartment: string;
  selectedCommittee: string;
  onBack: () => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      department: selectedDepartment,
      committee: selectedCommittee,
    },
  });

  const previousClub = watch("previousClub");

  const fileRequired = selectedDepartment === joinFileRequiredDepartment;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length === 0) return;

    const combined = [...files, ...picked];

    if (combined.length > MAX_FILES) {
      setFileError(`يمكنك رفع ${MAX_FILES} ملفات كحد أقصى`);
      e.target.value = "";
      return;
    }

    const tooBig = picked.find((f) => f.size > MAX_FILE_MB * 1024 * 1024);
    if (tooBig) {
      setFileError(`حجم الملف "${tooBig.name}" يتجاوز ${MAX_FILE_MB}MB`);
      e.target.value = "";
      return;
    }

    setFileError(null);
    setFiles(combined);
    e.target.value = "";
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  // تحويل الملفات المرفوعة إلى صيغة Base64 لإرسالها
  function filesToBase64(
    fileList: File[]
  ): Promise<{ base64: string; name: string; type: string }[]> {
    return Promise.all(
      fileList.map(
        (fileObj) =>
          new Promise<{ base64: string; name: string; type: string }>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(fileObj);
            reader.onload = () => {
              const base64Data = (reader.result as string).split(",")[1];
              resolve({
                base64: base64Data,
                name: fileObj.name,
                type: fileObj.type,
              });
            };
            reader.onerror = (error) => reject(error);
          })
      )
    );
  }

  async function onSubmit(values: FormValues) {
    if (fileRequired && files.length === 0) {
      setFileError("رفع الأعمال إجباري لهذه الإدارة");
      return;
    }

    try {
      const filePayloads = files.length > 0 ? await filesToBase64(files) : [];

      const payload = {
        name: values.name,
        email: values.email,
        universityId: values.universityId,
        phone: values.phone,
        nationalId: values.nationalId,
        university: values.university,
        major: values.major,
        department: values.department,
        committee: values.committee,
        previousClub: values.previousClub === "yes" ? "نعم" : "لا",
        previousClubExperience:
          values.previousClub === "yes" ? values.previousClubExperience || "" : "لا ينطبق",
        previousClubSkills: values.previousClubSkills || "",
        files: filePayloads.map((f) => ({
          name: f.name,
          data: f.base64,
          mimeType: f.type,
        })),
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result || result.status !== "ok") {
        throw new Error(result?.message || "لم يتم حفظ الطلب");
      }

      toast.success("تم استلام طلبك بنجاح! سنتواصل معك قريبًا.");
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("تعذّر حفظ طلبك، يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.");
    }
  }

  if (submitted) {
    return (
      <div className="qamat-surface mx-auto flex max-w-lg flex-col items-center gap-4 p-10 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-accent text-accent-foreground">
          <Check aria-hidden className="size-6" />
        </span>
        <h2 className="text-xl font-semibold">تم إرسال طلبك بنجاح</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          شكرًا لانضمامك إلى قامات، سيتواصل معك فريقنا خلال الأيام القادمة
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mx-auto max-w-3xl">
      <input type="hidden" {...register("department")} />
      <input type="hidden" {...register("committee")} />

      <div className="mb-10 rounded-2xl border border-border bg-white px-5 py-4 sm:flex sm:items-center sm:justify-between sm:gap-5">
        <div>
          <p className="text-xs text-muted-foreground">اختيارك</p>
          <p className="mt-1 text-sm font-semibold sm:text-base">{selectedCommittee}</p>
          {selectedDepartment !== selectedCommittee && (
            <p className="mt-0.5 text-xs text-muted-foreground">{selectedDepartment}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onBack}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-accent-strong sm:mt-0"
        >
          <ArrowRight aria-hidden className="size-4" />
          تغيير اللجنة
        </button>
      </div>

      {/* البيانات الأساسية */}
      <div>
        <h2 className="text-lg font-semibold sm:text-xl">بياناتك</h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="الاسم" required error={errors.name?.message}>
            <Input {...register("name")} className="qamat-dotted-yeh-input h-11 bg-white" placeholder="الاسم الكامل" />
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

          <Field label="الرقم الجامعي" required error={errors.universityId?.message}>
            <Input
              {...register("universityId")}
              className="qamat-dotted-yeh-input h-11 bg-white"
              placeholder="الرقم الجامعي"
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

          <Field
            label="رقم الهوية الوطنية / الإقامة"
            required
            error={errors.nationalId?.message}
          >
            <Input
              {...register("nationalId")}
              className="qamat-dotted-yeh-input h-11 bg-white"
              placeholder="1xxxxxxxxx"
              dir="ltr"
            />
          </Field>

          <Field label="الجامعة" required error={errors.university?.message}>
            <Input {...register("university")} className="qamat-dotted-yeh-input h-11 bg-white" placeholder="اسم الجامعة" />
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

      {/* الانضمام السابق */}
      <div className="mt-14">
        <h2 className="text-base font-semibold sm:text-lg">
          هل سبق أن انضممت إلى نادي؟
          <RequiredMark />
        </h2>

        <Controller
          control={control}
          name="previousClub"
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              dir="rtl"
              className="mt-5 flex w-full justify-start gap-6"
            >
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                <RadioGroupItem value="yes" />
                نعم
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                <RadioGroupItem value="no" />
                لا
              </label>
            </RadioGroup>
          )}
        />
        {errors.previousClub && (
          <p className="mt-1.5 text-xs text-destructive">{errors.previousClub.message}</p>
        )}

        {previousClub === "yes" && (
          <div className="mt-5">
            <Label className="mb-2 block text-base font-semibold sm:text-lg">
              ما دورك في النادي؟ وكيف كانت تجربتك فيه؟
              <RequiredMark />
            </Label>
            <Textarea
              {...register("previousClubExperience")}
              className="qamat-dotted-yeh-input min-h-28 bg-white"
              placeholder="اذكر اسم النادي، دورك، وأبرز ما اكتسبته من التجربة..."
            />
            {errors.previousClubExperience && (
              <p className="mt-1.5 text-xs text-destructive">
                {errors.previousClubExperience.message}
              </p>
            )}
          </div>
        )}

        <div className="mt-5">
          <Label className="mb-2 block text-base font-semibold sm:text-lg">
            هل لديك أي خبرات؟
            <RequiredMark />
          </Label>
          <Textarea
            {...register("previousClubSkills")}
            className="qamat-dotted-yeh-input min-h-28 bg-white"
            placeholder="اذكر خبراتك أو مهاراتك السابقة، وإذا لم توجد فاكتب: لا توجد"
          />
          {errors.previousClubSkills && (
            <p className="mt-1.5 text-xs text-destructive">
              {errors.previousClubSkills.message}
            </p>
          )}
        </div>
      </div>

      {/* رفع الأعمال */}
      <div className="mt-14">
        <h2 className="text-lg font-semibold sm:text-xl">
          الأعمال السابقة
          {fileRequired && <RequiredMark />}
        </h2>
        {!fileRequired && (
          <p className="mt-1 text-xs text-muted-foreground">اختياري إن وجدت</p>
        )}

        <label
          className={`mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed bg-white p-8 text-center transition-colors hover:border-primary ${
            fileError ? "border-destructive" : "border-border"
          }`}
        >
          <UploadCloud aria-hidden className="size-7 text-muted-foreground" />
          <span className="text-sm font-medium">
            {files.length > 0 ? "أضف ملفًا آخر" : "اضغط لاختيار ملف أو صورة"}
          </span>
          <span className="text-xs text-muted-foreground">
            PDF / صورة - حتى {MAX_FILE_MB}MB لكل ملف، وحتى {MAX_FILES} ملفات
          </span>
          <input
            type="file"
            accept="image/*,.pdf"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {files.length > 0 && (
          <ul className="mt-4 flex flex-col gap-2">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-2.5 text-sm"
              >
                <span className="truncate">{f.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  aria-label={`إزالة ${f.name}`}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                >
                  <X aria-hidden className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {fileError && <p className="mt-2 text-xs text-destructive">{fileError}</p>}
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
