import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import ContentSkeleton from "@/components/ContentSkeleton";
import ContentCard from "@/components/ContentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, FlaskConical, Calculator } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BacExam {
  id: string;
  title: string;
  description: string | null;
  year: number;
  branch: string;
}

const BacPage = () => {
  const [bacExams, setBacExams] = useState<BacExam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBacExams = async () => {
      try {
        const { data, error } = await supabase
          .from("bac_exams")
          .select("id, title, description, year, branch")
          .order("year", { ascending: false });

        if (error) {
          console.error("Error fetching bac exams:", error);
          return;
        }

        setBacExams(data || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBacExams();
  }, []);

  const seExams = bacExams.filter((exam) => exam.branch === "se");
  const mtExams = bacExams.filter((exam) => exam.branch === "mt");

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="مواضيع البكالوريا"
        description="مجموعة شاملة من مواضيع البكالوريا السابقة في الفيزياء والكيمياء مع الحلول النموذجية لجميع الشعب العلمية."
        keywords="بكالوريا, مواضيع بكالوريا, فيزياء, كيمياء, علوم تجريبية, رياضيات, الجزائر"
      />
      <Header />
      
      <main className="pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <PageBreadcrumb 
              items={[{ label: "البكالوريا" }]} 
              className="mb-8"
              variant="light"
            />
            <div className="max-w-3xl animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
                مواضيع البكالوريا
              </h1>
              <p className="text-xl text-primary-foreground/80">
                مجموعة شاملة من مواضيع البكالوريا السابقة مع الحلول النموذجية
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <ContentSkeleton type="card" count={6} />
            ) : bacExams.length > 0 ? (
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
            ) : (
              <div className="text-center py-16">
                <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد مواضيع بكالوريا حالياً</h3>
                <p className="text-muted-foreground">سيتم إضافة المواضيع قريباً</p>
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

export default BacPage;
