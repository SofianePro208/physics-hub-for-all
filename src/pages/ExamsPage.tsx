import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ContentByLevel from "@/components/ContentByLevel";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { FileText } from "lucide-react";

const allExams = [
  { id: 1, title: "فرض الفصل الأول", description: "امتحان شامل للفصل الأول", level: "السنة الأولى ثانوي", levelId: "1as-st" },
  { id: 2, title: "اختبار الفصل الأول", description: "الاختبار الفصلي مع الحل", level: "السنة الأولى ثانوي", levelId: "1as-st" },
  { id: 3, title: "فرض الفصل الثاني", description: "امتحان شامل للفصل الثاني", level: "السنة الأولى ثانوي", levelId: "1as-st" },
  { id: 4, title: "فرض الفصل الأول", description: "امتحان شامل للفصل الأول", level: "السنة الثانية - علوم تجريبية", levelId: "2as-se" },
  { id: 5, title: "اختبار الفصل الثاني", description: "الاختبار الفصلي مع الحل", level: "السنة الثانية - علوم تجريبية", levelId: "2as-se" },
  { id: 6, title: "فرض الفصل الأول", description: "امتحان شامل للفصل الأول", level: "السنة الثانية - رياضيات", levelId: "2as-mt" },
  { id: 7, title: "اختبار الفصل الثالث", description: "الاختبار النهائي مع الحل", level: "السنة الثانية - رياضيات", levelId: "2as-mt" },
  { id: 8, title: "فرض الفصل الأول", description: "امتحان شامل للفصل الأول", level: "السنة الثالثة - علوم تجريبية", levelId: "3as-se" },
  { id: 9, title: "بكالوريا تجريبي", description: "امتحان بكالوريا تجريبي مع التصحيح", level: "السنة الثالثة - علوم تجريبية", levelId: "3as-se" },
  { id: 10, title: "بكالوريا 2023", description: "موضوع بكالوريا 2023 مع الحل", level: "السنة الثالثة - علوم تجريبية", levelId: "3as-se" },
  { id: 11, title: "بكالوريا 2022", description: "موضوع بكالوريا 2022 مع الحل", level: "السنة الثالثة - رياضيات", levelId: "3as-mt" },
  { id: 12, title: "بكالوريا 2023", description: "موضوع بكالوريا 2023 مع الحل", level: "السنة الثالثة - رياضيات", levelId: "3as-mt" },
  { id: 13, title: "سلسلة تمارين الميكانيك", description: "تمارين متنوعة في الميكانيك", level: "السنة الثالثة - رياضيات", levelId: "3as-mt" },
];

const ExamsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="الامتحانات"
        description="فروض واختبارات ومواضيع بكالوريا في الفيزياء والكيمياء مع الحلول النموذجية. امتحانات شاملة لجميع المستويات."
        keywords="امتحانات فيزياء, فروض, اختبارات, بكالوريا, حلول نموذجية, الجزائر"
      />
      <Header />
      
      <main className="pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <PageBreadcrumb 
              items={[{ label: "الامتحانات" }]} 
              className="mb-8"
              variant="light"
            />
            <div className="max-w-3xl animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
                الامتحانات
              </h1>
              <p className="text-xl text-primary-foreground/80">
                فروض واختبارات ومواضيع بكالوريا مع الحلول مرتبة حسب المستوى
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <ContentByLevel items={allExams} type="exam" />
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ExamsPage;
