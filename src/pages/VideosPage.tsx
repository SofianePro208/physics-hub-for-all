import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ContentByLevel from "@/components/ContentByLevel";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import ContentSkeleton from "@/components/ContentSkeleton";
import { Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface VideoItem {
  id: string;
  title: string;
  description: string | null;
  level_id: string;
  trimester: number | null;
}

const VideosPage = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase
          .from("videos")
          .select("id, title, description, level_id, trimester")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching videos:", error);
          return;
        }

        setVideos(data || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Transform data for ContentByLevel component
  const formattedVideos = videos.map((video) => ({
    id: video.id,
    title: video.title,
    description: video.description || "",
    level: getLevelName(video.level_id),
    levelId: video.level_id,
    trimester: video.trimester || 1,
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
        title="الفيديوهات التعليمية"
        description="فيديوهات تعليمية لشرح دروس الفيزياء والكيمياء. شروحات مرئية مبسطة لجميع المستويات الدراسية."
        keywords="فيديوهات فيزياء, شرح دروس, تعليم مرئي, يوتيوب فيزياء, الجزائر"
      />
      <Header />
      
      <main className="pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <PageBreadcrumb 
              items={[{ label: "الفيديوهات" }]} 
              className="mb-8"
              variant="light"
            />
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
            {isLoading ? (
              <ContentSkeleton type="card" count={6} />
            ) : formattedVideos.length > 0 ? (
              <ContentByLevel items={formattedVideos} type="video" />
            ) : (
              <div className="text-center py-16">
                <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد فيديوهات حالياً</h3>
                <p className="text-muted-foreground">سيتم إضافة الفيديوهات قريباً</p>
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

export default VideosPage;
