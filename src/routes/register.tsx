import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Info, Building2, Send } from "lucide-react";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

interface Committee {
  id: string;
  name: string;
  description: string;
  tasks: string[];
}

interface Department {
  id: string;
  name: string;
  committees: Committee[];
}

const departmentsData: Department[] = [
  {
    id: "resources",
    name: "إدارة الموارد",
    committees: [
      {
        id: "recruitment",
        name: "لجنة الاستقطاب",
        description: "مسؤولة عن استقطاب وتعيين الكفاءات الأكاديمية والمهنية للمبادرة وإجراء المقابلات الأولية.",
        tasks: ["فرز طلبات الانضمام", "إجراء المقابلات", "متابعة انضمام الأعضاء الجدد"],
      },
      {
        id: "performance",
        name: "لجنة متابعة الأداء",
        description: "مسؤولة عن تقييم أداء الفرق ومتابعة إنجاز المهام وضمان جودة المخرجات وسير العمل.",
        tasks: ["متابعة مؤشرات الإنجاز", "إعداد تقارير الأداء الدورية", "حل التحديات التشغيلية"],
      },
    ],
  },
  {
    id: "media",
    name: "إدارة الإعلام والمحتوى",
    committees: [
      {
        id: "content",
        name: "لجنة كتابة المحتوى والتسويق",
        description: "مسؤولة عن كتابة المنشورات وصياغة الرسائل الإعلانية وإدارة الحملات التسويقية للمبادرة.",
        tasks: ["كتابة وتدقيق المحتوى", "إعداد الخطط التسويقية", "إدارة حسابات التواصل"],
      },
      {
        id: "design",
        name: "لجنة التصاميم",
        description: "مسؤولة عن إخراج الهوية البصرية، تصميم الإعلانات والبوسترات الرقمية والإنفوجرافيك.",
        tasks: ["تصميم البوسترات", "تطوير العناصر البصرية", "إخراج تصاميم الفعاليات"],
      },
      {
        id: "production",
        name: "لجنة التصوير والمونتاج",
        description: "مسؤولة عن التغطيات الميدانية وتصوير الفعاليات وإنتاج ومونتاج الفيديوهات والريلز.",
        tasks: ["التصوير الفوتوغرافي والفيديو", "مونتاج التغطيات", "أرشفة المواد الإعلامية"],
      },
    ],
  },
  {
    id: "pr",
    name: "إدارة العلاقات العامة",
    committees: [
      {
        id: "partnerships",
        name: "لجنة الشراكات",
        description: "مسؤولة عن بناء العلاقات مع الجهات والشركات واستقطاب الرعاة والداعمين للمبادرة.",
        tasks: ["إعداد ملفات الشراكة", "التواصل مع الجهات الراعية", "توقيع مذكرات التفاهم"],
      },
      {
        id: "collaborations",
        name: "لجنة التعاونات",
        description: "مسؤولة عن التنسيق مع الأندية والجهات الأكاديمية وتبادل الخبرات واستضافة المتحدثين.",
        tasks: ["التنسيق مع الأندية الطلابية", "دعوة المتحدثين والضيوف", "إدارة الفعاليات المشتركة"],
      },
    ],
  },
  {
    id: "tech",
    name: "اللجنة التقنية",
    committees: [
      {
        id: "dev",
        name: "اللجنة التقنية وتطوير المنصات",
        description: "مسؤولة عن إدارة وتطوير الموقع الإلكتروني والحلول البرمجية وتجربة المستخدم.",
        tasks: ["تطوير وصيانة الموقع", "إدارة قواعد البيانات ونماذج التسجيل", "الدعم الفني والتقني"],
      },
    ],
  },
  {
    id: "operations",
    name: "إدارة التشغيل والتطوير",
    committees: [
      {
        id: "ops",
        name: "إدارة التشغيل والتطوير",
        description: "مسؤولة عن تنظيم الفعاليات على أرض الواقع، وإدارة اللوجستيات والحشود وسير العمليات.",
        tasks: ["التنظيم الميداني وإدارة القاعات", "متابعة الجداول الزمنية", "تطوير مسارات المبادرة"],
      },
    ],
  },
];

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    phone: "",
    nationalId: "",
    university: "",
    major: "",
  });

  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null);
  const [activeDeptTab, setActiveDeptTab] = useState<string>(departmentsData[0].id);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCommittee) {
      alert("يرجى اختيار اللجنة المراد الانضمام لها عبر النقر عليها.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#15274E] hover:text-[#1E3A8A] mb-8"
        >
          <ArrowRight className="size-4" />
          العودة للرئيسية
        </Link>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#15274E]/10 text-[#15274E] mb-3">
            <Building2 className="size-3.5" />
            انضمام للمبادرة
          </span>
          <h1 className="text-3xl font-bold text-[#15274E] sm:text-4xl">
            نموذج الانضمام لمبادرة قامات
          </h1>
          <p className="mt-3 text-sm text-[#475569] leading-relaxed">
            املأ بياناتك، ثم اضغط على اللجنة لقراءة وصفها ومهامها واختيارها للتسجيل.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 bg-white border border-emerald-100 rounded-2xl shadow-sm text-center max-w-lg mx-auto"
          >
            <CheckCircle2 className="size-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#15274E]">تم استلام طلبك بنجاح!</h2>
            <p className="text-sm text-[#64748B] mt-2">
              شكراً لانضمامك، سيتم مراجعة بياناتك والتواصل معك قريباً.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex rounded-lg bg-[#15274E] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#1E3A8A]"
            >
              العودة للرئيسية
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* 1. البيانات المطلوبة */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#15274E]/10 shadow-sm">
              <h2 className="text-lg font-bold text-[#15274E] mb-6 flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#15274E] text-white text-xs">١</span>
                البيانات المطلوبة للتسجيل
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#15274E] mb-2">الاسم *</label>
                  <input
                    type="text"
                    required
                    placeholder="الاسم الثلاثي"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#15274E] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#15274E] mb-2">الرقم الجامعي *</label>
                  <input
                    type="text"
                    required
                    placeholder="44xxxxxxxx"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#15274E] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#15274E] mb-2">رقم الجوال *</label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="05xxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 text-right rounded-lg border border-slate-200 focus:border-[#15274E] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#15274E] mb-2">رقم الهوية الوطنية / الإقامة *</label>
                  <input
                    type="text"
                    required
                    placeholder="10xxxxxxxx"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#15274E] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#15274E] mb-2">الجامعة *</label>
                  <input
                    type="text"
                    required
                    placeholder="اسم الجامعة"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#15274E] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#15274E] mb-2">التخصص *</label>
                  <input
                    type="text"
                    required
                    placeholder="التخصص الأكاديمي"
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#15274E] outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* 2. هيكلة الإدارات واللجان */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#15274E]/10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <h2 className="text-lg font-bold text-[#15274E] flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-full bg-[#15274E] text-white text-xs">٢</span>
                  هيكلة الإدارات واللجان المتاحة
                </h2>
                <div className="inline-flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                  <Info className="size-3.5 shrink-0" />
                  <span>اضغط على اسم اللجنة لقراءة الشرح واختيارها</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4 mb-6">
                {departmentsData.map((dept) => (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => setActiveDeptTab(dept.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      activeDeptTab === dept.id
                        ? "bg-[#15274E] text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {dept.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {departmentsData
                  .find((d) => d.id === activeDeptTab)
                  ?.committees.map((com) => {
                    const isSelected = selectedCommittee?.id === com.id;
                    return (
                      <div
                        key={com.id}
                        onClick={() => setSelectedCommittee(com)}
                        className={`cursor-pointer rounded-xl p-5 border-2 transition-all text-right flex flex-col justify-between ${
                          isSelected
                            ? "border-[#15274E] bg-[#15274E]/5 shadow-sm"
                            : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-[#15274E]">{com.name}</span>
                            <div className={`size-5 rounded-full border flex items-center justify-center ${isSelected ? "border-[#15274E] bg-[#15274E]" : "border-slate-300 bg-white"}`}>
                              {isSelected && <div className="size-2 rounded-full bg-white" />}
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed mb-4">
                            {com.description}
                          </p>
                        </div>

                        <div className="border-t border-slate-200/60 pt-3">
                          <span className="block text-[11px] font-semibold text-[#15274E] mb-1.5">المهام الأساسية:</span>
                          <ul className="space-y-1">
                            {com.tasks.map((task, idx) => (
                              <li key={idx} className="text-[11px] text-slate-500 flex items-center gap-1.5">
                                <span className="size-1 rounded-full bg-[#15274E]/60" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">اللجنة المحددة حالياً:</span>
                {selectedCommittee ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                    <CheckCircle2 className="size-3.5" />
                    {selectedCommittee.name}
                  </span>
                ) : (
                  <span className="text-xs font-medium text-amber-600">اضغط على أي لجنة بالأعلى لاختيارها</span>
                )}
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#15274E] px-10 py-4 text-base font-bold text-white shadow-md hover:bg-[#1E3A8A] hover:shadow-lg transition-all"
              >
                تأكيد وإرسال طلب الانضمام
                <Send className="size-4 rotate-180" />
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}