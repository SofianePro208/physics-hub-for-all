import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { ChevronRight, HelpCircle, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    title: "أسئلة عامة",
    questions: [
      {
        question: "ما هي منصة فيزياء الثانوي؟",
        answer: "منصة فيزياء الثانوي هي منصة تعليمية إلكترونية متخصصة في تقديم محتوى تعليمي شامل لمادة العلوم الفيزيائية لطلاب التعليم الثانوي في الجزائر. نقدم دروساً مفصلة، امتحانات مع الحلول، وفيديوهات تعليمية لجميع المستويات.",
      },
      {
        question: "هل المنصة مجانية؟",
        answer: "نعم، جميع المحتوى المتوفر على المنصة مجاني بالكامل. نؤمن بأن التعليم الجيد يجب أن يكون متاحاً للجميع.",
      },
      {
        question: "ما هي المستويات المتوفرة؟",
        answer: "نقدم محتوى تعليمي لجميع مستويات التعليم الثانوي: السنة الأولى (جذع مشترك علوم وتكنولوجيا)، السنة الثانية (علوم تجريبية، رياضيات، تقني رياضي)، والسنة الثالثة (علوم تجريبية، رياضيات، تقني رياضي).",
      },
    ],
  },
  {
    title: "المحتوى التعليمي",
    questions: [
      {
        question: "هل الدروس متوافقة مع المنهاج الرسمي؟",
        answer: "نعم، جميع الدروس والمحتوى التعليمي مُعد وفقاً للمنهاج الرسمي المعتمد من وزارة التربية الوطنية الجزائرية.",
      },
      {
        question: "هل يمكنني تحميل الدروس والامتحانات؟",
        answer: "نعم، يمكنك تحميل الدروس والامتحانات بصيغة PDF للمراجعة بدون الحاجة للاتصال بالإنترنت. استخدم زر التحميل الموجود في كل درس أو امتحان.",
      },
      {
        question: "كم عدد الامتحانات المتوفرة؟",
        answer: "لدينا أكثر من 100 امتحان يشمل فروض، اختبارات فصلية، ومواضيع بكالوريا للسنوات السابقة، جميعها مرفقة بالحلول النموذجية المفصلة.",
      },
      {
        question: "هل الفيديوهات متوفرة على المنصة مباشرة؟",
        answer: "نعم، الفيديوهات التعليمية متوفرة مباشرة على المنصة ويمكنك مشاهدتها في أي وقت. كما يمكنك متابعتنا على يوتيوب للحصول على آخر الفيديوهات.",
      },
    ],
  },
  {
    title: "الاستخدام والدعم",
    questions: [
      {
        question: "هل أحتاج إلى تسجيل حساب؟",
        answer: "لا، يمكنك الوصول إلى جميع المحتوى بدون تسجيل. لكن قد نضيف ميزات إضافية مستقبلاً للمستخدمين المسجلين مثل تتبع التقدم وحفظ الدروس المفضلة.",
      },
      {
        question: "كيف يمكنني التواصل معكم؟",
        answer: "يمكنك التواصل معنا عبر صفحة 'اتصل بنا' أو مراسلتنا على البريد الإلكتروني. نرد على جميع الاستفسارات في أقرب وقت ممكن.",
      },
      {
        question: "هل يمكنني طلب شرح درس معين؟",
        answer: "بالطبع! نرحب باقتراحاتكم وطلباتكم. راسلونا عبر صفحة الاتصال وسنعمل على تلبية طلباتكم.",
      },
      {
        question: "هل المنصة متوافقة مع الهواتف؟",
        answer: "نعم، المنصة مصممة لتعمل بشكل ممتاز على جميع الأجهزة: الهواتف الذكية، الأجهزة اللوحية، وأجهزة الكمبيوتر.",
      },
    ],
  },
  {
    title: "البكالوريا",
    questions: [
      {
        question: "هل لديكم مواضيع بكالوريا السنوات السابقة؟",
        answer: "نعم، لدينا مجموعة كبيرة من مواضيع بكالوريا السنوات السابقة لجميع الشعب (علوم تجريبية، رياضيات، تقني رياضي) مع الحلول النموذجية المفصلة.",
      },
      {
        question: "ما هي أفضل طريقة للتحضير للبكالوريا؟",
        answer: "ننصح بمراجعة الدروس أولاً، ثم حل التمارين والفروض، وأخيراً التدرب على مواضيع البكالوريا السابقة. المفتاح هو الممارسة المستمرة وفهم المفاهيم الأساسية.",
      },
    ],
  },
];

const FAQPage = () => {
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
              <span className="text-white">الأسئلة الشائعة</span>
            </nav>

            <div className="max-w-3xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                الأسئلة الشائعة
              </h1>
              <p className="text-xl text-white/80">
                إجابات على الأسئلة الأكثر شيوعاً حول منصتنا
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-card animate-fade-in"
                  style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                >
                  <div className="bg-muted/50 px-6 py-4 border-b border-border/50">
                    <h2 className="text-lg font-bold text-foreground">{category.title}</h2>
                  </div>
                  <Accordion type="single" collapsible className="px-2">
                    {category.questions.map((item, index) => (
                      <AccordionItem key={index} value={`${categoryIndex}-${index}`} className="border-b border-border/30 last:border-0">
                        <AccordionTrigger className="px-4 py-4 text-right hover:no-underline hover:bg-muted/30 rounded-lg transition-colors">
                          <span className="text-foreground font-medium">{item.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}

              {/* Contact CTA */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">لم تجد إجابة لسؤالك؟</h3>
                <p className="text-muted-foreground mb-6">
                  لا تتردد في التواصل معنا وسنرد على استفسارك في أقرب وقت
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  تواصل معنا
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </Link>
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

export default FAQPage;
