import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Database, UserCheck, Mail, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: Database,
    title: "جمع المعلومات",
    content: `نقوم بجمع المعلومات التي تقدمها لنا مباشرة عند استخدام منصتنا. تشمل هذه المعلومات:
    
• معلومات الحساب: الاسم، البريد الإلكتروني، كلمة المرور المشفرة
• معلومات الملف الشخصي: المستوى الدراسي، الشعبة
• بيانات الاستخدام: الصفحات التي تزورها، الوقت المستغرق، التفاعلات
• معلومات الجهاز: نوع المتصفح، نظام التشغيل، عنوان IP`,
  },
  {
    icon: Eye,
    title: "استخدام المعلومات",
    content: `نستخدم المعلومات التي نجمعها للأغراض التالية:

• تقديم وتحسين خدماتنا التعليمية
• تخصيص تجربة التعلم حسب مستواك واحتياجاتك
• إرسال إشعارات حول المحتوى الجديد والتحديثات
• تحليل استخدام المنصة لتحسين الأداء
• التواصل معك بخصوص استفساراتك ودعمك`,
  },
  {
    icon: Lock,
    title: "حماية المعلومات",
    content: `نتخذ إجراءات أمنية صارمة لحماية معلوماتك الشخصية:

• تشفير جميع البيانات أثناء النقل والتخزين
• استخدام بروتوكولات HTTPS الآمنة
• تحديث أنظمة الأمان بشكل دوري
• تقييد الوصول إلى البيانات للموظفين المصرح لهم فقط
• عدم بيع أو مشاركة بياناتك مع أطراف ثالثة لأغراض تجارية`,
  },
  {
    icon: UserCheck,
    title: "حقوقك",
    content: `لديك الحق في:

• الوصول إلى بياناتك الشخصية وطلب نسخة منها
• تصحيح أي معلومات غير دقيقة
• حذف حسابك وجميع البيانات المرتبطة به
• الاعتراض على معالجة بياناتك لأغراض معينة
• سحب موافقتك في أي وقت
• تقديم شكوى للجهات المختصة`,
  },
  {
    icon: Shield,
    title: "ملفات تعريف الارتباط",
    content: `نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك:

• ملفات ضرورية: للحفاظ على جلسة تسجيل الدخول
• ملفات تحليلية: لفهم كيفية استخدام الموقع
• ملفات التفضيلات: لتذكر إعداداتك المفضلة

يمكنك تعطيل ملفات تعريف الارتباط من إعدادات متصفحك، لكن قد يؤثر ذلك على بعض وظائف الموقع.`,
  },
  {
    icon: Mail,
    title: "التواصل معنا",
    content: `إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يمكنك التواصل معنا عبر:

• البريد الإلكتروني: privacy@physics-edu.dz
• نموذج الاتصال على موقعنا

سنرد على استفساراتك في أقرب وقت ممكن.`,
  },
];

const PrivacyPolicyPage = () => {
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
              <span className="text-white">سياسة الخصوصية</span>
            </nav>

            <div className="max-w-3xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                سياسة الخصوصية
              </h1>
              <p className="text-xl text-white/80">
                نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية
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
                  مرحباً بك في منصة فيزياء الثانوي. نحن نقدر ثقتك بنا ونلتزم بحماية خصوصيتك. 
                  توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدام منصتنا التعليمية.
                  باستخدامك للمنصة، فإنك توافق على الممارسات الموضحة في هذه السياسة.
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
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <section.icon className="w-6 h-6 text-primary" />
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

              {/* Footer Note */}
              <div className="bg-muted/50 rounded-2xl p-8 mt-8 text-center">
                <p className="text-muted-foreground">
                  نحتفظ بالحق في تعديل سياسة الخصوصية هذه في أي وقت. 
                  سيتم إعلامك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار على المنصة.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
