import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, BookOpen, FileText, Video, Calendar, Download, ExternalLink, Share2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";
import PDFViewer from "@/components/PDFViewer";
import RelatedContent from "@/components/RelatedContent";
import { toast } from "@/hooks/use-toast";

type ContentType = "lesson" | "exam" | "video" | "bac";

interface ContentData {
  id: string;
  title: string;
  description: string | null;
  level_id?: string;
  created_at: string;
  pdf_url?: string | null;
  solution_pdf_url?: string | null;
  youtube_url?: string | null;
  year?: number;
  branch?: string;
}

const typeConfig = {
  lesson: {
    icon: BookOpen,
    label: "درس",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    table: "lessons" as const,
  },
  exam: {
    icon: FileText,
    label: "امتحان",
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    table: "exams" as const,
  },
  video: {
    icon: Video,
    label: "فيديو",
    color: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    table: "videos" as const,
  },
  bac: {
    icon: Award,
    label: "بكالوريا",
    color: "bg-green-500/10 text-green-500 border-green-500/20",
    table: "bac_exams" as const,
  },
};

const getLevelName = (levelId: string): string => {
  const levels: Record<string, string> = {
    "1as": "السنة الأولى ثانوي",
    "1as-st": "السنة الأولى ثانوي",
    "2as-se": "السنة الثانية - علوم تجريبية",
    "2as-mt": "السنة الثانية - رياضيات وتقني رياضي",
    "3as-se": "السنة الثالثة - علوم تجريبية",
    "3as-mt": "السنة الثالثة - رياضيات وتقني رياضي",
  };
  return levels[levelId] || levelId;
};

const ContentViewPage = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<ContentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSolution, setShowSolution] = useState(false);

  const contentType = type as ContentType;
  const config = typeConfig[contentType];

  useEffect(() => {
    const fetchContent = async () => {
      if (!type || !id || !config) {
        navigate("/404");
        return;
      }

      try {
        const { data, error } = await supabase
          .from(config.table)
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error || !data) {
          navigate("/404");
          return;
        }

        // For bac_exams, map branch to level_id for display
        const contentData = data as ContentData;
        if (contentType === "bac" && "branch" in data) {
          contentData.level_id = data.branch === "se" ? "3as-se" : "3as-mt";
          contentData.branch = data.branch;
        }

        setContent(contentData);
      } catch (error) {
        console.error("Error fetching content:", error);
        navigate("/404");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [type, id, config, navigate, contentType]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: content?.title,
          text: content?.description || "",
          url,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: "تم نسخ الرابط",
        description: "تم نسخ رابط الصفحة إلى الحافظة",
      });
    }
  };

  const getYoutubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^&?\n]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-12 w-full max-w-xl mb-8" />
            <Skeleton className="h-[600px] w-full rounded-xl" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!content || !config) {
    return null;
  }

  const Icon = config.icon;
  const embedUrl = contentType === "video" && content.youtube_url ? getYoutubeEmbedUrl(content.youtube_url) : null;

  return (
    <div className="min-h-screen">
      <SEOHead
        title={content.title}
        description={content.description || `${config.label} - ${getLevelName(content.level_id)}`}
        keywords={`${config.label}, ${getLevelName(content.level_id)}, فيزياء, كيمياء`}
      />
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6 gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowRight className="w-4 h-4" />
            رجوع
          </Button>

          {/* Content Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="outline" className={config.color}>
                <Icon className="w-3 h-3 ml-1" />
                {config.label}
              </Badge>
              <Badge variant="secondary">
                {getLevelName(content.level_id)}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(content.created_at).toLocaleDateString("ar-DZ")}
              </span>
            </div>

            <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-4">
              {content.title}
            </h1>

            {content.description && (
              <p className="text-muted-foreground text-lg max-w-3xl">
                {content.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <Button variant="outline" onClick={handleShare} className="gap-2">
                <Share2 className="w-4 h-4" />
                مشاركة
              </Button>

              {(contentType === "lesson" || contentType === "exam" || contentType === "bac") && content.pdf_url && (
                <Button asChild className="gap-2">
                  <a href={content.pdf_url} download target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4" />
                    تحميل PDF
                  </a>
                </Button>
              )}

              {(contentType === "exam" || contentType === "bac") && content.solution_pdf_url && (
                <Button
                  variant="secondary"
                  onClick={() => setShowSolution(!showSolution)}
                  className="gap-2"
                >
                  {showSolution ? "عرض الامتحان" : "عرض الحل"}
                </Button>
              )}

              {contentType === "video" && content.youtube_url && (
                <Button asChild variant="secondary" className="gap-2">
                  <a href={content.youtube_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    مشاهدة على يوتيوب
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Content Viewer */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {/* PDF Viewer for Lessons, Exams, and Bac */}
              {(contentType === "lesson" || contentType === "exam" || contentType === "bac") && (
                <>
                  {content.pdf_url && !showSolution && (
                    <PDFViewer url={content.pdf_url} title={content.title} />
                  )}
                  {(contentType === "exam" || contentType === "bac") && showSolution && content.solution_pdf_url && (
                    <PDFViewer url={content.solution_pdf_url} title={`حل - ${content.title}`} />
                  )}
                  {!content.pdf_url && !showSolution && (
                    <div className="flex items-center justify-center h-[400px] bg-muted/30">
                      <p className="text-muted-foreground">لا يوجد ملف PDF متاح</p>
                    </div>
                  )}
                </>
              )}

              {/* Video Player */}
              {contentType === "video" && (
                <>
                  {embedUrl ? (
                    <div className="aspect-video">
                      <iframe
                        src={embedUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={content.title}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[400px] bg-muted/30">
                      <p className="text-muted-foreground">لا يوجد فيديو متاح</p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Related Content Section */}
          {contentType !== "bac" && content.level_id && (
            <RelatedContent 
              type={config.table as "lessons" | "exams" | "videos"} 
              levelId={content.level_id} 
              currentId={content.id} 
            />
          )}

          {/* More Content Link */}
          <div className="mt-8 text-center">
            <Link
              to={`/${contentType}s`}
              className="text-primary hover:underline inline-flex items-center gap-2"
            >
              عرض المزيد من {config.label === "درس" ? "الدروس" : config.label === "امتحان" ? "الامتحانات" : "الفيديوهات"}
              <ArrowRight className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ContentViewPage;
