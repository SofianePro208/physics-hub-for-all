import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentByLevel from "@/components/ContentByLevel";
import { Video } from "lucide-react";

const allVideos = [
  { id: 1, title: "شرح الحركة المستقيمة", description: "فيديو تعليمي مفصل عن الحركة", level: "السنة الأولى ثانوي", levelId: "1as-st" },
  { id: 2, title: "تجربة سقوط الأجسام", description: "تجربة عملية مع الشرح", level: "السنة الأولى ثانوي", levelId: "1as-st" },
  { id: 3, title: "شرح قوانين نيوتن", description: "القوانين الثلاث للميكانيك", level: "السنة الأولى ثانوي", levelId: "1as-st" },
  { id: 4, title: "حل تمارين التوازن", description: "تمارين محلولة عن التوازن", level: "السنة الثانية - علوم تجريبية", levelId: "2as-se" },
  { id: 5, title: "شرح العمل والطاقة", description: "مفهوم الشغل والطاقة الحركية", level: "السنة الثانية - علوم تجريبية", levelId: "2as-se" },
  { id: 6, title: "حل تمارين الميكانيك", description: "حل تطبيقي لتمارين متنوعة", level: "السنة الثانية - رياضيات", levelId: "2as-mt" },
  { id: 7, title: "شرح كمية الحركة", description: "انحفاظ كمية الحركة", level: "السنة الثانية - رياضيات", levelId: "2as-mt" },
  { id: 8, title: "شرح الظواهر الكهربائية", description: "الدارات الكهربائية بالتفصيل", level: "السنة الثالثة - علوم تجريبية", levelId: "3as-se" },
  { id: 9, title: "شرح التفاعلات الكيميائية", description: "تطور جملة كيميائية", level: "السنة الثالثة - علوم تجريبية", levelId: "3as-se" },
  { id: 10, title: "تصحيح بكالوريا 2023", description: "حل موضوع بكالوريا كامل", level: "السنة الثالثة - رياضيات", levelId: "3as-mt" },
  { id: 11, title: "شرح الموجات الميكانيكية", description: "انتشار الموجات وخصائصها", level: "السنة الثالثة - رياضيات", levelId: "3as-mt" },
];

const VideosPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mb-6">
                <Video className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
                الفيديوهات التعليمية
              </h1>
              <p className="text-xl text-primary-foreground/80">
                شروحات مرئية لجميع الدروس والتجارب مرتبة حسب المستوى
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <ContentByLevel items={allVideos} type="video" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VideosPage;
