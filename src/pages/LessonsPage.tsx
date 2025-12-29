import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ContentByLevel from "@/components/ContentByLevel";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import ContentSkeleton from "@/components/ContentSkeleton";
import { BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  level_id: string;
  trimester: number | null;
}

const LessonsPage = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const { data, error } = await supabase
          .from("lessons")
          .select("id, title, description, level_id, trimester")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching lessons:", error);
          return;
        }

        setLessons(data || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, []);

  // Transform data for ContentByLevel component
  const formattedLessons = lessons.map((lesson) => ({
    id: lesson.id,
    title: lesson.title,
    description: lesson.description || "",
    level: getLevelName(lesson.level_id),
    levelId: lesson.level_id,
    trimester: lesson.trimester || 1,
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
        title="الدروس"
        description="جميع دروس الفيزياء والكيمياء للتعليم الثانوي الجزائري. دروس مفصلة ومرتبة حسب المستوى الدراسي."
        keywords="دروس فيزياء, دروس كيمياء, ثانوي, الجزائر, شرح دروس"
      />
      <Header />
      
      <main className="pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <PageBreadcrumb 
              items={[{ label: "الدروس" }]} 
              className="mb-8"
              variant="light"
            />
            <div className="max-w-3xl animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
                الدروس
              </h1>
              <p className="text-xl text-primary-foreground/80">
                جميع دروس الفيزياء والكيمياء مرتبة حسب المستوى الدراسي
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <ContentSkeleton type="card" count={6} />
            ) : formattedLessons.length > 0 ? (
              <ContentByLevel items={formattedLessons} type="lesson" />
            ) : (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد دروس حالياً</h3>
                <p className="text-muted-foreground">سيتم إضافة الدروس قريباً</p>
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

export default LessonsPage;
