import { useEffect, useState } from "react";
import { Award, FlaskConical, Calculator } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ContentCard from "@/components/ContentCard";
import ContentSkeleton from "@/components/ContentSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BacExam {
  id: string;
  title: string;
  description: string | null;
  year: number;
  branch: string;
}

const BacExamsSection = () => {
  const [bacExams, setBacExams] = useState<BacExam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBacExams = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("bac_exams")
          .select("id, title, description, year, branch")
          .order("year", { ascending: false });

        if (error) throw error;
        setBacExams(data || []);
      } catch (error) {
        console.error("Error fetching bac exams:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBacExams();
  }, []);

  const getExamsByBranch = (branch: string) => {
    return bacExams.filter((exam) => exam.branch === branch);
  };

  const seExams = getExamsByBranch("se");
  const mtExams = getExamsByBranch("mt");

  return (
    <section className="py-14 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-physics-gold/10 border border-physics-gold/20 mb-6">
            <Award className="w-5 h-5 text-physics-gold" />
            <span className="text-physics-gold font-semibold">بكالوريات سابقة</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            مواضيع البكالوريا السابقة
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            مجموعة شاملة من مواضيع البكالوريا مع الحلول النموذجية لجميع الشعب
          </p>
        </div>

        {isLoading ? (
          <ContentSkeleton type="card" count={6} />
        ) : (
          <Tabs defaultValue="se" className="space-y-10">
            <TabsList className="w-full max-w-xl mx-auto grid grid-cols-2 h-16 p-1.5 bg-muted/60 backdrop-blur-sm rounded-2xl border border-border/50">
              <TabsTrigger 
                value="se" 
                className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-md rounded-xl font-semibold transition-all duration-300"
              >
                <FlaskConical className="w-5 h-5" />
                <span className="hidden sm:inline">شعبة العلوم التجريبية</span>
                <span className="sm:hidden">علوم تجريبية</span>
                <span className="text-xs text-muted-foreground font-bold">({seExams.length})</span>
              </TabsTrigger>
              <TabsTrigger 
                value="mt" 
                className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-md rounded-xl font-semibold transition-all duration-300"
              >
                <Calculator className="w-5 h-5" />
                <span className="hidden sm:inline">شعبة الرياضيات والتقني</span>
                <span className="sm:hidden">رياضيات وتقني</span>
                <span className="text-xs text-muted-foreground font-bold">({mtExams.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="se" className="space-y-6">
              {seExams.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {seExams.map((exam, index) => (
                    <ContentCard
                      key={exam.id}
                      type="exam"
                      title={exam.title}
                      description={exam.description || `بكالوريا ${exam.year} - شعبة العلوم التجريبية`}
                      level="السنة الثالثة ثانوي"
                      href={`/content/bac/${exam.id}`}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <FlaskConical className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد مواضيع بعد</h3>
                  <p className="text-muted-foreground">سيتم إضافة مواضيع البكالوريا قريباً</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="mt" className="space-y-6">
              {mtExams.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mtExams.map((exam, index) => (
                    <ContentCard
                      key={exam.id}
                      type="exam"
                      title={exam.title}
                      description={exam.description || `بكالوريا ${exam.year} - شعبة الرياضيات والتقني رياضي`}
                      level="السنة الثالثة ثانوي"
                      href={`/content/bac/${exam.id}`}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Calculator className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد مواضيع بعد</h3>
                  <p className="text-muted-foreground">سيتم إضافة مواضيع البكالوريا قريباً</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </section>
  );
};

export default BacExamsSection;
