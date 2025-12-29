import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SharePrintButtons from "@/components/SharePrintButtons";
import ContentCard from "@/components/ContentCard";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import ContentSkeleton from "@/components/ContentSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Video, GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const levelData: Record<string, { title: string; description: string; matches: string[] }> = {
  "1as": {
    title: "السنة الأولى ثانوي",
    description: "أساسيات الفيزياء والكيمياء للتعليم الثانوي",
    matches: ["1as", "1as-st"],
  },
  "2as": {
    title: "السنة الثانية ثانوي",
    description: "دراسة معمقة للميكانيك والكهرباء والكيمياء",
    matches: ["2as", "2as-se", "2as-mt", "2as-tm"],
  },
  "3as": {
    title: "السنة الثالثة ثانوي",
    description: "تحضير شامل لامتحان البكالوريا مع مواضيع وحلول نموذجية",
    matches: ["3as", "3as-se", "3as-mt", "3as-tm"],
  },
};

interface ContentItem {
  id: string;
  title: string;
  description: string | null;
}

const LevelPage = () => {
  const { levelId } = useParams();
  const level = levelData[levelId || ""] || levelData["1as"];
  const matches = level.matches;

  const [lessons, setLessons] = useState<ContentItem[]>([]);
  const [exams, setExams] = useState<ContentItem[]>([]);
  const [videos, setVideos] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const [lessonsRes, examsRes, videosRes] = await Promise.all([
          supabase
            .from("lessons")
            .select("id, title, description")
            .in("level_id", matches)
            .order("created_at", { ascending: false }),
          supabase
            .from("exams")
            .select("id, title, description")
            .in("level_id", matches)
            .order("created_at", { ascending: false }),
          supabase
            .from("videos")
            .select("id, title, description")
            .in("level_id", matches)
            .order("created_at", { ascending: false }),
        ]);

        setLessons(lessonsRes.data || []);
        setExams(examsRes.data || []);
        setVideos(videosRes.data || []);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [levelId, matches]);

  const breadcrumbItems = [
    { label: level.title },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={level.title}
        description={`${level.description}. دروس، امتحانات، وفيديوهات تعليمية في الفيزياء والكيمياء.`}
        keywords={`${level.title}, فيزياء, كيمياء, دروس, امتحانات, الجزائر`}
      />
      <Header />
      
      <main className="pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="gradient-hero py-20 lg:py-28 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 right-[10%] w-64 h-64 bg-physics-cyan/15 rounded-full blur-[80px]" />
            <div className="absolute bottom-10 left-[5%] w-80 h-80 bg-physics-gold/10 rounded-full blur-[100px]" />
          </div>
          
          <div className="container mx-auto px-4 relative">
            <PageBreadcrumb 
              items={breadcrumbItems} 
              className="mb-10"
              variant="light"
            />

            <div className="max-w-3xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-start justify-between gap-4 mb-8">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-physics-cyan to-physics-blue flex items-center justify-center shadow-xl">
                  <GraduationCap className="w-10 h-10 text-primary-foreground" />
                </div>
                <SharePrintButtons 
                  title={level.title} 
                  description={level.description}
                  className="[&_button]:border-white/20 [&_button]:text-white [&_button]:hover:bg-white/10"
                />
              </div>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-primary-foreground mb-5">
                {level.title}
              </h1>
              <p className="text-xl text-primary-foreground/85 leading-relaxed">
                {level.description}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-14 lg:py-24">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <ContentSkeleton type="card" count={6} />
            ) : (
              <Tabs defaultValue="lessons" className="space-y-10">
                <TabsList className="w-full max-w-lg mx-auto grid grid-cols-3 h-16 p-1.5 bg-muted/60 backdrop-blur-sm rounded-2xl border border-border/50">
                  <TabsTrigger value="lessons" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-md rounded-xl font-semibold transition-all duration-300">
                    <BookOpen className="w-5 h-5" />
                    <span className="hidden sm:inline">الدروس</span>
                    <span className="text-xs text-muted-foreground font-bold">({lessons.length})</span>
                  </TabsTrigger>
                  <TabsTrigger value="exams" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-md rounded-xl font-semibold transition-all duration-300">
                    <FileText className="w-5 h-5" />
                    <span className="hidden sm:inline">الامتحانات</span>
                    <span className="text-xs text-muted-foreground font-bold">({exams.length})</span>
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-md rounded-xl font-semibold transition-all duration-300">
                    <Video className="w-5 h-5" />
                    <span className="hidden sm:inline">الفيديوهات</span>
                    <span className="text-xs text-muted-foreground font-bold">({videos.length})</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="lessons" className="space-y-6">
                  {lessons.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {lessons.map((item, index) => (
                        <ContentCard
                          key={item.id}
                          type="lesson"
                          title={item.title}
                          description={item.description || ""}
                          level={level.title}
                          href={`/content/lesson/${item.id}`}
                          delay={index * 0.1}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد دروس حالياً</h3>
                      <p className="text-muted-foreground">سيتم إضافة الدروس قريباً</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="exams" className="space-y-6">
                  {exams.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {exams.map((item, index) => (
                        <ContentCard
                          key={item.id}
                          type="exam"
                          title={item.title}
                          description={item.description || ""}
                          level={level.title}
                          href={`/content/exam/${item.id}`}
                          downloadUrl="#"
                          delay={index * 0.1}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد امتحانات حالياً</h3>
                      <p className="text-muted-foreground">سيتم إضافة الامتحانات قريباً</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="videos" className="space-y-6">
                  {videos.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {videos.map((item, index) => (
                        <ContentCard
                          key={item.id}
                          type="video"
                          title={item.title}
                          description={item.description || ""}
                          level={level.title}
                          href={`/content/video/${item.id}`}
                          delay={index * 0.1}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد فيديوهات حالياً</h3>
                      <p className="text-muted-foreground">سيتم إضافة الفيديوهات قريباً</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default LevelPage;
