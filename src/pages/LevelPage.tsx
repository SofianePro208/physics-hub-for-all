import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SharePrintButtons from "@/components/SharePrintButtons";
import ContentCard from "@/components/ContentCard";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Video, GraduationCap } from "lucide-react";

const levelData: Record<string, { title: string; year: string; branch: string; description: string }> = {
  "1as": {
    title: "السنة الأولى ثانوي",
    year: "السنة الأولى",
    branch: "جذع مشترك علوم وتكنولوجيا",
    description: "أساسيات الفيزياء والكيمياء للتعليم الثانوي",
  },
  "2as-se": {
    title: "السنة الثانية ثانوي - علوم تجريبية",
    year: "السنة الثانية",
    branch: "شعبة العلوم التجريبية",
    description: "دراسة معمقة للميكانيك والكهرباء والكيمياء",
  },
  "2as-mt": {
    title: "السنة الثانية ثانوي - رياضيات وتقني رياضي",
    year: "السنة الثانية",
    branch: "شعبة الرياضيات والتقني رياضي",
    description: "فيزياء متقدمة لشعبة الرياضيات والتقني رياضي",
  },
  "3as-se": {
    title: "السنة الثالثة ثانوي - علوم تجريبية",
    year: "السنة الثالثة",
    branch: "شعبة العلوم التجريبية",
    description: "تحضير شامل لبكالوريا العلوم التجريبية",
  },
  "3as-mt": {
    title: "السنة الثالثة ثانوي - رياضيات وتقني رياضي",
    year: "السنة الثالثة",
    branch: "شعبة الرياضيات والتقني رياضي",
    description: "تحضير شامل لبكالوريا الرياضيات والتقني رياضي",
  },
};

const contentData: Record<string, { lessons: any[]; exams: any[]; videos: any[] }> = {
  "1as": {
    lessons: [
      { id: 1, title: "الحركة والسكون", description: "دراسة المرجع والمعلم في الفيزياء" },
      { id: 2, title: "السرعة المتوسطة واللحظية", description: "حساب السرعة في الحركات المختلفة" },
      { id: 3, title: "القوة والحركة", description: "العلاقة بين القوة والتسارع" },
      { id: 4, title: "بنية المادة", description: "الذرة والجزيئات والروابط الكيميائية" },
    ],
    exams: [
      { id: 1, title: "فرض الفصل الأول", description: "امتحان شامل للفصل الأول" },
      { id: 2, title: "اختبار الفصل الأول", description: "الاختبار الفصلي مع الحل" },
      { id: 3, title: "فرض الفصل الثاني", description: "امتحان شامل للفصل الثاني" },
    ],
    videos: [
      { id: 1, title: "شرح الحركة المستقيمة", description: "فيديو تعليمي مفصل عن الحركة" },
      { id: 2, title: "تجربة سقوط الأجسام", description: "تجربة عملية مع الشرح" },
    ],
  },
  "2as-se": {
    lessons: [
      { id: 1, title: "القوى والتوازن", description: "شروط توازن جسم صلب خاضع لقوتين" },
      { id: 2, title: "العمل والطاقة", description: "العمل الميكانيكي والطاقة الحركية" },
      { id: 3, title: "كمية الحركة", description: "انحفاظ كمية الحركة" },
    ],
    exams: [
      { id: 1, title: "فرض الفصل الأول", description: "امتحان شامل للفصل الأول" },
      { id: 2, title: "اختبار الفصل الثاني", description: "الاختبار الفصلي مع الحل" },
    ],
    videos: [
      { id: 1, title: "حل تمارين التوازن", description: "تمارين محلولة عن التوازن" },
      { id: 2, title: "شرح العمل والطاقة", description: "مفهوم الشغل والطاقة الحركية" },
    ],
  },
  "2as-mt": {
    lessons: [
      { id: 1, title: "الطاقة الحركية والكامنة", description: "أشكال الطاقة وتحولاتها" },
      { id: 2, title: "كمية الحركة", description: "انحفاظ كمية الحركة والتصادمات" },
      { id: 3, title: "الحركة الدورانية", description: "دراسة حركة الأجسام الصلبة" },
    ],
    exams: [
      { id: 1, title: "فرض الفصل الأول", description: "امتحان شامل للفصل الأول" },
      { id: 2, title: "اختبار الفصل الثالث", description: "الاختبار النهائي مع الحل" },
    ],
    videos: [
      { id: 1, title: "حل تمارين الميكانيك", description: "حل تطبيقي لتمارين متنوعة" },
      { id: 2, title: "شرح كمية الحركة", description: "انحفاظ كمية الحركة" },
    ],
  },
  "2as-tm": {
    lessons: [
      { id: 1, title: "الطاقة الحركية والكامنة", description: "أشكال الطاقة وتحولاتها" },
      { id: 2, title: "الدارات الكهربائية", description: "تحليل الدارات الكهربائية" },
    ],
    exams: [
      { id: 1, title: "فرض الفصل الأول", description: "امتحان شامل للفصل الأول" },
    ],
    videos: [
      { id: 1, title: "شرح الدارات الكهربائية", description: "تحليل الدارات" },
    ],
  },
  "3as-se": {
    lessons: [
      { id: 1, title: "الظواهر الكهربائية", description: "الدارات الكهربائية والقوانين الأساسية" },
      { id: 2, title: "تطور جملة كيميائية", description: "التحولات الكيميائية والتقدم" },
      { id: 3, title: "الموجات الميكانيكية", description: "انتشار الموجات وخصائصها" },
    ],
    exams: [
      { id: 1, title: "فرض الفصل الأول", description: "امتحان شامل للفصل الأول" },
      { id: 2, title: "بكالوريا تجريبي", description: "امتحان بكالوريا تجريبي مع التصحيح" },
      { id: 3, title: "بكالوريا 2023", description: "موضوع بكالوريا 2023 مع الحل" },
    ],
    videos: [
      { id: 1, title: "شرح الظواهر الكهربائية", description: "الدارات الكهربائية بالتفصيل" },
      { id: 2, title: "شرح التفاعلات الكيميائية", description: "تطور جملة كيميائية" },
    ],
  },
  "3as-mt": {
    lessons: [
      { id: 1, title: "الموجات الميكانيكية", description: "انتشار الموجات وخصائصها" },
      { id: 2, title: "الموجات الكهرومغناطيسية", description: "الضوء والظواهر الموجية" },
      { id: 3, title: "النشاط الإشعاعي", description: "التحلل الإشعاعي وقوانينه" },
    ],
    exams: [
      { id: 1, title: "بكالوريا 2022", description: "موضوع بكالوريا 2022 مع الحل" },
      { id: 2, title: "بكالوريا 2023", description: "موضوع بكالوريا 2023 مع الحل" },
      { id: 3, title: "سلسلة تمارين الميكانيك", description: "تمارين متنوعة في الميكانيك" },
    ],
    videos: [
      { id: 1, title: "تصحيح بكالوريا 2023", description: "حل موضوع بكالوريا كامل" },
      { id: 2, title: "شرح الموجات الميكانيكية", description: "انتشار الموجات وخصائصها" },
    ],
  },
  "3as-tm": {
    lessons: [
      { id: 1, title: "الموجات الميكانيكية", description: "انتشار الموجات وخصائصها" },
      { id: 2, title: "الدارات الكهربائية", description: "تحليل الدارات RLC" },
    ],
    exams: [
      { id: 1, title: "بكالوريا 2023", description: "موضوع بكالوريا 2023 مع الحل" },
    ],
    videos: [
      { id: 1, title: "شرح الدارات RLC", description: "تحليل دارات التيار المتناوب" },
    ],
  },
};

const LevelPage = () => {
  const { levelId } = useParams();
  const level = levelData[levelId || ""] || levelData["1as"];
  const content = contentData[levelId || ""] || contentData["1as"];

  // Get sibling branches for the current year
  const currentYear = levelId?.split("-")[0];
  const siblingBranches = Object.entries(levelData)
    .filter(([id]) => id.startsWith(currentYear || "") && id !== levelId)
    .map(([id, data]) => ({ id, ...data }));

  const breadcrumbItems = [
    { label: level.year, href: "/" },
    { label: level.branch || level.title },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={level.title}
        description={`${level.description}. دروس، امتحانات، وفيديوهات تعليمية في الفيزياء والكيمياء.`}
        keywords={`${level.title}, فيزياء, كيمياء, دروس, امتحانات, ${level.branch}, الجزائر`}
      />
      <Header />
      
      <main className="pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <PageBreadcrumb 
              items={breadcrumbItems} 
              className="mb-8"
              variant="light"
            />

            <div className="max-w-3xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-primary-foreground" />
                </div>
                <SharePrintButtons 
                  title={level.title} 
                  description={level.description}
                  className="[&_button]:border-white/20 [&_button]:text-white [&_button]:hover:bg-white/10"
                />
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
                {level.title}
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-6">
                {level.description}
              </p>

              {/* Sibling Branches */}
              {siblingBranches.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  <span className="text-primary-foreground/70 text-sm self-center">الشعب الأخرى:</span>
                  {siblingBranches.map((branch) => (
                    <Link
                      key={branch.id}
                      to={`/level/${branch.id}`}
                      className="px-4 py-2 rounded-lg bg-primary-foreground/10 text-primary-foreground text-sm hover:bg-primary-foreground/20 transition-colors"
                    >
                      {branch.branch}
                    </Link>
                  ))}
                </div>
              )}
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
                  <span className="text-xs text-muted-foreground">({content.lessons.length})</span>
                </TabsTrigger>
                <TabsTrigger value="exams" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">الامتحانات</span>
                  <span className="text-xs text-muted-foreground">({content.exams.length})</span>
                </TabsTrigger>
                <TabsTrigger value="videos" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg">
                  <Video className="w-4 h-4" />
                  <span className="hidden sm:inline">الفيديوهات</span>
                  <span className="text-xs text-muted-foreground">({content.videos.length})</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="lessons" className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.lessons.map((item, index) => (
                    <ContentCard
                      key={item.id}
                      type="lesson"
                      title={item.title}
                      description={item.description}
                      level={level.branch || level.title}
                      href={`/level/${levelId}/lesson/${item.id}`}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="exams" className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.exams.map((item, index) => (
                    <ContentCard
                      key={item.id}
                      type="exam"
                      title={item.title}
                      description={item.description}
                      level={level.branch || level.title}
                      href={`/level/${levelId}/exam/${item.id}`}
                      downloadUrl="#"
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="videos" className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.videos.map((item, index) => (
                    <ContentCard
                      key={item.id}
                      type="video"
                      title={item.title}
                      description={item.description}
                      level={level.branch || level.title}
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
      <ScrollToTop />
    </div>
  );
};

export default LevelPage;
