import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ExamsByTrimester from "@/components/ExamsByTrimester";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import ContentSkeleton from "@/components/ContentSkeleton";
import { FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Exam {
  id: string;
  title: string;
  description: string | null;
  level_id: string;
  trimester: number | null;
  exam_type: string | null;
}

const ExamsPage = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const { data, error } = await supabase
          .from("exams")
          .select("id, title, description, level_id, trimester, exam_type")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching exams:", error);
          return;
        }

        setExams(data || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Transform data for ExamsByTrimester component
  const formattedExams = exams.map((exam) => ({
    id: exam.id,
    title: exam.title,
    description: exam.description || "",
    level: getLevelName(exam.level_id),
    levelId: exam.level_id,
    trimester: exam.trimester || 1,
    examType: exam.exam_type || "test",
  }));

  function getLevelName(levelId: string): string {
    const levelNames: Record<string, string> = {
      "1as": "السنة الأولى ثانوي",
      "1as-st": "السنة الأولى ثانوي",
      "2as-se": "السنة الثانية - علوم تجريبية",
      "2as-mt": "السنة الثانية - رياضيات وتقني رياضي",
      "3as-se": "السنة الثالثة - علوم تجريبية",
      "3as-mt": "السنة الثالثة - رياضيات وتقني رياضي",
    };
    return levelNames[levelId] || levelId;
  }

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
                فروض واختبارات وسلاسل تمارين مرتبة حسب الفصل والمستوى
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <ContentSkeleton type="card" count={6} />
            ) : formattedExams.length > 0 ? (
              <ExamsByTrimester items={formattedExams} />
            ) : (
              <div className="text-center py-16">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد امتحانات حالياً</h3>
                <p className="text-muted-foreground">سيتم إضافة الامتحانات قريباً</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ExamsPage;
