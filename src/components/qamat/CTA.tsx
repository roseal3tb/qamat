import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info, ChevronLeft, Building2, Send } from "lucide-react";

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
    id: "marketing",
    name: "إدارة التسويق والتواصل",
    committees: [
      {
        id: "content",
        name: "لجنة صناعة المحتوى والكتابة",
        description: "مسؤولة عن صياغة المحتوى الإبداعي والتسويقي، كتابة المقالات، التغريدات، والرسائل الإعلانية التي تعبر عن هوية قامات.",
        tasks: ["كتابة وتدقيق المحتوى", "إعداد خطط النشر الأسبوعية", "صياغة سيناريوهات الفيديو"]
      },
      {
        id: "design",
        name: "لجنة التصميم والهوية البصرية",
        description: "مسؤولة عن إنتاج جميع التصاميم البصرية، البوسترات، وتطوير عناصر الهوية المرئية لتعزيز حضور المبادرة.",
        tasks: ["تصميم المنشورات والإنفوجرافيك", "تجهيز هوية الفعاليات", "إخراج المطبوعات الرقمية"]
      },
      {
        id: "media",
        name: "لجنة الإعلام والتغطيات",
        description: "مسؤولة عن تصوير وتوثيق الفعاليات الميدانية والورش التدريبية وصناعة الريلز والتغطيات المباشرة.",
        tasks: ["التصوير الفوتوغرافي والفيديو", "المونتاج السريع للفعاليات", "إدارة التغطيات الحية"]
      }
    ]
  },
  {
    id: "operations",
    name: "إدارة التنظيم والعمليات",
    committees: [
      {
        id: "events",
        name: "لجنة تنظيم الفعاليات واللوجستيات",
        description: "مسؤولة عن إدارة الحشود، حجز القاعات، تجهيز المواقع الميدانية وضمان سير الفعاليات واللقاءات بسلاسة.",
        tasks: ["إدارة العمليات الميدانية", "التنسيق مع الجهات المستضيفة", "متابعة الحضور وتوزيع المهام"]
      },
      {
        id: "protocols",
        name: "لجنة العلاقات العامة والبروتوكول",
        description: "مسؤولة عن التواصل مع الضيوف والمدربين واستقبال الشخصيات والجهات المشاركة.",
        tasks: ["استقبال الضيوف والمتحدثين", "إعداد خطابات الدعوة والشكر", "التنسيق مع الرعاة والشركاء"]
      }
    ]
  },
  {
    id: "academic",
    name: "إدارة التدريب والمحتوى المعرفي",
    committees: [
      {
        id: "programs",
        name: "لجنة إعداد وتطوير البرامج",
        description: "مسؤولة عن بناء الخطط التدريبية والمناهج المهارية للورش والبرامج الخاصة بمبادرة قامات.",
        tasks: ["تحديد الاحتياج التدريبي", "تصميم مسارات ورش العمل", "تقييم مخرجات التدريب"]
      },
      {
        id: "quality",
        name: "لجنة الجودة والمتابعة",
        description: "مسؤولة عن قياس أثر المبادرة، جمع التغذية الراجعة من المستفيدين وإعداد تقارير الأداء الدورية.",
        tasks: ["تصميم استبانات التقييم", "تحليل مؤشرات الأداء", "أرشفة التقارير الدورية"]
      }
    ]
  }
];

export function CTA() {
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
    <section id="register" className="relative bg-[#F8FAFC] py-24 border-t border-[#15274E]/10">
      <div className="container-q max-w-5xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#15274E]/10 text-[#15274E] mb-3">
            <Building2 className="size-3.5" />
            انضمام للمبادرة
          </span>
          <h2 className="text-3xl font-bold text-[#15274E] sm:text-4xl">
            نموذج الانضمام لمبادرة قامات
          </h2>
          <p className="mt-3 text-sm text-[#475569] leading-relaxed">
            املأ بياناتك الشخصية والأكاديمية، ثم استعرض الهيكلة الإدارية بالنقر على اللجان لقراءة الوصف واختيار لجنتك المفضلة.
          </p>
        </div>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 bg-white border border-emerald-100 rounded-2xl shadow-sm text-center max-w-lg mx-auto"
          >
            <CheckCircle2 className="size-16 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#15274E]">تم استلام طلبك بنجاح!</h3>
            <p className="text-sm text-[#64748B] mt-2">
              شكراً لانضمامك، سيتم مراجعة بياناتك والتواصل معك عبر الواتساب أو البريد قريباً.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* 1. البيانات الشخصية والأكاديمية */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#15274E]/10 shadow-sm">
              <h3 className="text-lg font-bold text-[#15274E] mb-6 flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#15274E] text-white text-xs">١</span>
                البيانات المطلوبة للتسجيل
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#15274E] mb-2">الاسم الثلاثي *</label>
                  <input
                    type="text"
                    required
                    placeholder="محمد عبدالله الشهري"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#15274E] focus:ring-1 focus:ring-[#15274E] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#15274E] mb-2">الرقم الجامعي *</label>
                  <input
                    type="text"
                    required
                    placeholder="441000000"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#15274E] focus:ring-1 focus:ring-[#15274E] outline-none text-sm"
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
                    className="w-full px-4 py-3 text-right rounded-lg border border-slate-200 focus:border-[#15274E] focus:ring-1 focus:ring-[#15274E] outline-none text-sm"
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#15274E] focus:ring-1 focus:ring-[#15274E] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#15274E] mb-2">الجامعة *</label>
                  <input
                    type="text"
                    required
                    placeholder="جامعة الملك سعود"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#15274E] focus:ring-1 focus:ring-[#15274E] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#15274E] mb-2">التخصص *</label>
                  <input
                    type="text"
                    required
                    placeholder="تقنية المعلومات / هندسة البرمجيات"
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#15274E] focus:ring-1 focus:ring-[#15274E] outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* 2. هيكلة الإدارات واللجان التفاعلية */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#15274E]/10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <h3 className="text-lg font-bold text-[#15274E] flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-full bg-[#15274E] text-white text-xs">٢</span>
                  هيكلة الإدارات واللجان
                </h3>
                <div className="inline-flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                  <Info className="size-3.5 shrink-0" />
                  <span>اضغط على اسم اللجنة لعرض وصفها واختيارها</span>
                </div>
              </div>

              {/* تبويبات الإدارات */}
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

              {/* قائمة لجان الإدارة المحددة */}
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

              {/* استعراض اللجنة المختارة */}
              <div className="mt-6 p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">اللجنة المحددة حالياً للتسجيل:</span>
                {selectedCommittee ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                    <CheckCircle2 className="size-3.5" />
                    {selectedCommittee.name}
                  </span>
                ) : (
                  <span className="text-xs font-medium text-amber-600">لم تقم باختيار لجنة بعد</span>
                )}
              </div>
            </div>

            {/* زر الإرسال */}
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
    </section>
  );
}
