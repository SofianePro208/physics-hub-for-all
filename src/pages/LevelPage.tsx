import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentCard from "@/components/ContentCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Video, ChevronRight } from "lucide-react";

const levelData: Record<string, { title: string; description: string }> = {
  "1as-st": {
    title: "السنة الأولى ثانوي",
    description: "جذع مشترك علوم وتكنولوجيا",
  },
  "2as-se": {
    title: "السنة الثانية ثانوي",
    description: "شعبة العلوم التجريبية",
  },
  "2as-mt": {
    title: "السنة الثانية ثانوي",
    description: "شعبة الرياضيات والتقني رياضي",
  },
  "3as-se": {
    title: "السنة الثالثة ثانوي",
    description: "شعبة العلوم التجريبية",
  },
  "3as-mt": {
    title: "السنة الثالثة ثانوي",
    description: "شعبة الرياضيات والتقني رياضي",
  },
};

// Sample content data
const sampleContent = {
  lessons: [
    { id: 1, title: "الحركة والسكون", description: "دراسة المرجع والمعلم في الفيزياء" },
    { id: 2, title: "السرعة المتوسطة واللحظية", description: "حساب السرعة في الحركات المختلفة" },
    { id: 3, title: "القوى والتوازن", description: "شروط توازن جسم صلب" },
    { id: 4, title: "الطاقة الحركية والكامنة", description: "أشكال الطاقة وتحولاتها" },
  ],
  exams: [
    { id: 1, title: "فرض الفصل الأول", description: "امتحان شامل للفصل الأول" },
    { id: 2, title: "اختبار الفصل الأول", description: "الاختبار الفصلي مع الحل" },
    { id: 3, title: "فرض الفصل الثاني", description: "امتحان شامل للفصل الثاني" },
  ],
  videos: [
    { id: 1, title: "شرح الحركة المستقيمة", description: "فيديو تعليمي مفصل" },
    { id: 2, title: "تجربة سقوط الأجسام", description: "تجربة عملية مع الشرح" },
  ],
};

const LevelPage = () => {
  const { levelId } = useParams();
  const level = levelData[levelId || ""] || levelData["1as-st"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-primary-foreground/70 mb-8 animate-fade-in">
              <Link to="/" className="hover:text-primary-foreground transition-colors">
                الرئيسية
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-primary-foreground">{level.title}</span>
            </nav>

            <div className="max-w-3xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
                {level.title}
              </h1>
              <p className="text-xl text-primary-foreground/80">
                {level.description}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="lessons" className="space-y-8">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 h-14 p-1 bg-muted rounded-xl">
                <TabsTrigger value="lessons" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">الدروس</span>
                </TabsTrigger>
                <TabsTrigger value="exams" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">الامتحانات</span>
                </TabsTrigger>
                <TabsTrigger value="videos" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg">
                  <Video className="w-4 h-4" />
                  <span className="hidden sm:inline">الفيديوهات</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="lessons" className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sampleContent.lessons.map((item, index) => (
                    <ContentCard
                      key={item.id}
                      type="lesson"
                      title={item.title}
                      description={item.description}
                      level={level.title}
                      href={`/level/${levelId}/lesson/${item.id}`}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="exams" className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sampleContent.exams.map((item, index) => (
                    <ContentCard
                      key={item.id}
                      type="exam"
                      title={item.title}
                      description={item.description}
                      level={level.title}
                      href={`/level/${levelId}/exam/${item.id}`}
                      downloadUrl="#"
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="videos" className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sampleContent.videos.map((item, index) => (
                    <ContentCard
                      key={item.id}
                      type="video"
                      title={item.title}
                      description={item.description}
                      level={level.title}
                      href={`/level/${levelId}/video/${item.id}`}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LevelPage;
