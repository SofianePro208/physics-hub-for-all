import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentCard from "@/components/ContentCard";
import { FileText } from "lucide-react";

const allExams = [
  { id: 1, title: "فرض الفصل الأول", description: "امتحان شامل للفصل الأول", level: "السنة الأولى ثانوي", levelId: "1as-st" },
  { id: 2, title: "اختبار الفصل الأول", description: "الاختبار الفصلي مع الحل", level: "السنة الأولى ثانوي", levelId: "1as-st" },
  { id: 3, title: "فرض الفصل الثاني", description: "امتحان شامل للفصل الثاني", level: "السنة الثانية - علوم تجريبية", levelId: "2as-se" },
  { id: 4, title: "بكالوريا تجريبي", description: "امتحان بكالوريا تجريبي مع التصحيح", level: "السنة الثالثة - علوم تجريبية", levelId: "3as-se" },
  { id: 5, title: "بكالوريا 2023", description: "موضوع بكالوريا 2023 مع الحل", level: "السنة الثالثة - رياضيات", levelId: "3as-mt" },
  { id: 6, title: "سلسلة تمارين", description: "تمارين متنوعة في الميكانيك", level: "السنة الثالثة - رياضيات", levelId: "3as-mt" },
];

const ExamsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
                الامتحانات
              </h1>
              <p className="text-xl text-primary-foreground/80">
                فروض واختبارات ومواضيع بكالوريا مع الحلول
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allExams.map((item, index) => (
                <ContentCard
                  key={item.id}
                  type="exam"
                  title={item.title}
                  description={item.description}
                  level={item.level}
                  href={`/level/${item.levelId}/exam/${item.id}`}
                  downloadUrl="#"
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ExamsPage;
