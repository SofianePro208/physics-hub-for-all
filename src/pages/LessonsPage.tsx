import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentCard from "@/components/ContentCard";
import { BookOpen } from "lucide-react";

const allLessons = [
  { id: 1, title: "الحركة والسكون", description: "دراسة المرجع والمعلم في الفيزياء", level: "السنة الأولى ثانوي", levelId: "1as-st" },
  { id: 2, title: "السرعة المتوسطة واللحظية", description: "حساب السرعة في الحركات المختلفة", level: "السنة الأولى ثانوي", levelId: "1as-st" },
  { id: 3, title: "القوى والتوازن", description: "شروط توازن جسم صلب", level: "السنة الثانية - علوم تجريبية", levelId: "2as-se" },
  { id: 4, title: "الطاقة الحركية والكامنة", description: "أشكال الطاقة وتحولاتها", level: "السنة الثانية - رياضيات", levelId: "2as-mt" },
  { id: 5, title: "الظواهر الكهربائية", description: "الدارات الكهربائية والقوانين الأساسية", level: "السنة الثالثة - علوم تجريبية", levelId: "3as-se" },
  { id: 6, title: "الموجات الميكانيكية", description: "انتشار الموجات وخصائصها", level: "السنة الثالثة - رياضيات", levelId: "3as-mt" },
];

const LessonsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
                الدروس
              </h1>
              <p className="text-xl text-primary-foreground/80">
                جميع دروس الفيزياء لكل المستويات والشعب
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allLessons.map((item, index) => (
                <ContentCard
                  key={item.id}
                  type="lesson"
                  title={item.title}
                  description={item.description}
                  level={item.level}
                  href={`/level/${item.levelId}/lesson/${item.id}`}
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

export default LessonsPage;
