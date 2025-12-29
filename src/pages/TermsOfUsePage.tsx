import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { FileText, CheckCircle, XCircle, AlertTriangle, Scale, RefreshCw, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: CheckCircle,
    title: "قبول الشروط",
    content: `باستخدامك لمنصة فيزياء الثانوي، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام المنصة.

• يجب أن يكون عمرك 13 سنة على الأقل لاستخدام المنصة
• إذا كنت قاصراً، يجب الحصول على موافقة ولي الأمر
• أنت مسؤول عن الحفاظ على سرية حسابك وكلمة المرور`,
  },
  {
    icon: FileText,
    title: "استخدام المحتوى",
    content: `جميع المحتويات المتوفرة على المنصة (دروس، امتحانات، فيديوهات) محمية بحقوق الملكية الفكرية:

• يُسمح لك باستخدام المحتوى لأغراض التعلم الشخصي فقط
• يُمنع نسخ أو توزيع أو بيع أي محتوى دون إذن كتابي
• يُمنع مشاركة حسابك مع أشخاص آخرين
• يُسمح بتحميل المحتوى للاستخدام الشخصي دون اتصال بالإنترنت`,
  },
  {
    icon: XCircle,
    title: "السلوكيات المحظورة",
    content: `يُحظر عليك القيام بما يلي:

• انتحال شخصية أي شخص أو كيان
• نشر محتوى مسيء أو غير لائق
• محاولة اختراق أو تعطيل المنصة
• استخدام المنصة لأغراض تجارية دون إذن
• جمع معلومات المستخدمين الآخرين
• نشر روابط ضارة أو برامج خبيثة
• التحايل على أي قيود تقنية`,
  },
  {
    icon: AlertTriangle,
    title: "إخلاء المسؤولية",
    content: `نسعى لتقديم محتوى دقيق وعالي الجودة، ولكن:

• لا نضمن خلو المحتوى من الأخطاء بشكل كامل
• المحتوى مُعد للمساعدة وليس بديلاً عن التعليم الرسمي
• لا نتحمل مسؤولية نتائج الامتحانات الرسمية
• قد يتغير المحتوى وفقاً لتحديثات المنهاج الرسمي
• نحتفظ بالحق في تعديل أو حذف أي محتوى`,
  },
  {
    icon: Scale,
    title: "حقوق الملكية الفكرية",
    content: `جميع حقوق الملكية الفكرية محفوظة لمنصة فيزياء الثانوي:

• الشعار والعلامة التجارية ملك للمنصة
• تصميم الموقع والواجهات محمية بحقوق النشر
• المحتوى التعليمي مُعد من طرف فريقنا أو بترخيص
• أي انتهاك لحقوق الملكية قد يعرضك للمساءلة القانونية`,
  },
  {
    icon: RefreshCw,
    title: "التعديلات والإنهاء",
    content: `نحتفظ بالحق في:

• تعديل هذه الشروط في أي وقت
• تعليق أو إنهاء حسابك في حالة مخالفة الشروط
• تغيير أو إيقاف أي ميزة من ميزات المنصة
• إرسال إشعارات بالتغييرات الجوهرية

استمرارك في استخدام المنصة بعد أي تعديل يعني موافقتك على الشروط المُعدّلة.`,
  },
];

const TermsOfUsePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-white/70 mb-8 animate-fade-in">
              <Link to="/" className="hover:text-white transition-colors">الرئيسية</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">شروط الاستخدام</span>
            </nav>

            <div className="max-w-3xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                شروط الاستخدام
              </h1>
              <p className="text-xl text-white/80">
                يرجى قراءة هذه الشروط بعناية قبل استخدام منصتنا
              </p>
              <p className="text-sm text-white/60 mt-4">
                آخر تحديث: {new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="bg-card rounded-2xl border border-border/50 p-8 mb-8 shadow-card">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  مرحباً بك في منصة فيزياء الثانوي. تحدد شروط الاستخدام هذه القواعد والأحكام التي تنظم استخدامك لمنصتنا التعليمية.
                  نهدف من خلال هذه الشروط إلى ضمان تجربة تعليمية آمنة ومفيدة لجميع المستخدمين.
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-6">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-2xl border border-border/50 p-8 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-physics-gold/10 flex items-center justify-center shrink-0">
                        <section.icon className="w-6 h-6 text-physics-gold" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground mb-4">{section.title}</h2>
                        <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Section */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mt-8">
                <h3 className="text-lg font-bold text-foreground mb-4">هل لديك أسئلة؟</h3>
                <p className="text-muted-foreground mb-4">
                  إذا كان لديك أي استفسار حول شروط الاستخدام، لا تتردد في التواصل معنا.
                </p>
                <Link 
                  to="mailto:support@physics-edu.dz"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                  support@physics-edu.dz
                </Link>
              </div>

              {/* Agreement Note */}
              <div className="bg-muted/50 rounded-2xl p-8 mt-8 text-center">
                <p className="text-muted-foreground">
                  باستخدامك لمنصة فيزياء الثانوي، فإنك تقر بأنك قرأت وفهمت ووافقت على جميع الشروط والأحكام المذكورة أعلاه.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default TermsOfUsePage;
