import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Info, Building2, Send } from "lucide-react";

interface CommitteeInfo {
  id: string;
  name: string;
  description: string;
}

const availableCommittees: CommitteeInfo[] = [
  {
    id: "content",
    name: "لجنة كتابة المحتوى والتسويق",
    description: "إعداد الخطط التسويقية وصياغة النصوص الإبداعية والنشر عبر المنصات."
  },
  {
    id: "design",
    name: "لجنة التصاميم",
    description: "تنفيذ الهويات البصرية والمنشورات والإنفوجرافيك للمبادرة."
  },
  {
    id: "media",
    name: "لجنة التصوير والمونتاج",
    description: "التغطيات الميدانية وتوثيق الفعاليات وصناعة المواد المرئية."
  },
  {
    id: "partnerships",
    name: "لجنة الشراكات والتعاونات",
    description: "بناء العلاقات مع الجهات الخارجية واستقطاب الرعاة والمتحدثين."
  },
  {
    id: "hr",
    name: "لجنة الموارد البشرية والاستقطاب",
    description: "متابعة أداء الأعضاء، التنظيم الإداري، وإدارة شؤون الفريق."
  },
  {
    id: "operations",
    name: "لجنة التنظيم والتشغيل",
    description: "إدارة الفعاليات الميدانية واللوجستيات وسير العمل على أرض الواقع."
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

  const [selectedCommittee, setSelectedCommittee] = useState<CommitteeInfo | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCommittee) {
      alert("يرجى النقر على إحدى اللجان لاختيارها قبل الإرسال.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="register" className="relative bg-[#F8FAFC] py-24 border-t border-[#15274E]/10">
      <div className="container-q max-w-4xl">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#15274E]/10 text-[#15274E] mb-3">
            <Building2 className="size-3.5" />
            انضم إلينا
          </span>
          <h2 className="text-3xl font-bold text-[#15274E]">
            طلب الانضمام لمبادرة قامات
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            أدخل بياناتك ثم اضغط على اللجنة التي ترغب بالانضمام إليها
          </p>
        </div>

        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 bg-white border border-emerald-100 rounded-2xl shadow-sm text-center max-w-md mx-auto"
          >
            <CheckCircle2 className="size-14 text-emerald-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-[#15274E]">تم إرسال طلبك بنجاح</h3>
            <p className="text-xs text-slate-500 mt-2">
              شكراً لاهتمامك، سنتواصل معك عبر الجوال بعد مراجعة الطلب.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* البيانات الشخصية */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-base font-bold text-[#15274E] mb-5 flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-[#15274E] text-white text-xs">١</span>
                البيانات الشخصية والأكاديمية
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">الاسم الثلاثي *</label>
                  <input
                    type="text"
                    required
                    placeholder="الاسم الكامل"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#15274E] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">الرقم الجامعي *</label>
                  <input
                    type="text"
                    required
                    placeholder="44xxxxxxxx"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#15274E] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">رقم الجوال *</label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="05xxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 text-right rounded-lg border border-slate-200 focus:border-[#15274E] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">رقم الهوية الوطنية / الإقامة *</label>
                  <input
                    type="text"
                    required
                    placeholder="10xxxxxxxx"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#15274E] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">الجامعة *</label>
                  <input
                    type="text"
                    required
                    placeholder="اسم الجامعة"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#15274E] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">التخصص *</label>
                  <input
                    type="text"
                    required
                    placeholder="التخصص الأكاديمي"
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#15274E] outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* اللجان المتاحة */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <h3 className="text-base font-bold text-[#15274E] flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#15274E] text-white text-xs">٢</span>
                  اختر اللجنة المراد الانضمام لها
                </h3>
                <div className="inline-flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
                  <Info className="size-3.5 shrink-0" />
                  <span>اضغط على اسم اللجنة لقراءة الوصف واختيارها</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {availableCommittees.map((com) => {
                  const isSelected = selectedCommittee?.id === com.id;
                  return (
                    <div
                      key={com.id}
                      onClick={() => setSelectedCommittee(com)}
                      className={`cursor-pointer rounded-xl p-4 border-2 transition-all text-right ${
                        isSelected
                          ? "border-[#15274E] bg-[#15274E]/5 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-bold text-[#15274E]">{com.name}</span>
                        <div className={`size-4 rounded-full border flex items-center justify-center ${isSelected ? "border-[#15274E] bg-[#15274E]" : "border-slate-300 bg-white"}`}>
                          {isSelected && <div className="size-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {com.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#15274E] px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#1E3A8A] transition-all"
              >
                إرسال طلب الانضمام
                <Send className="size-4 rotate-180" />
              </button>
            </div>

          </form>
        )}
      </div>
    </section>
  );
}
