import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, FileText, Video, Clock, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

interface ContentItem {
  id: string;
  title: string;
  description: string | null;
  level_id: string;
  created_at: string;
  type: "lesson" | "exam" | "video";
}

const typeConfig = {
  lesson: {
    icon: BookOpen,
    label: "درس",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  exam: {
    icon: FileText,
    label: "امتحان",
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  video: {
    icon: Video,
    label: "فيديو",
    color: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  },
};

const getLevelName = (levelId: string): string => {
  const levels: Record<string, string> = {
    "1as": "السنة الأولى ثانوي",
    "2as-se": "السنة الثانية - علوم تجريبية",
    "2as-mt": "السنة الثانية - رياضيات وتقني",
    "3as-se": "السنة الثالثة - علوم تجريبية",
    "3as-mt": "السنة الثالثة - رياضيات وتقني",
  };
  return levels[levelId] || levelId;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "اليوم";
  if (diffDays === 1) return "أمس";
  if (diffDays < 7) return `منذ ${diffDays} أيام`;
  if (diffDays < 30) return `منذ ${Math.floor(diffDays / 7)} أسابيع`;
  return date.toLocaleDateString("ar-DZ");
};

const RecentContentSection = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentContent = async () => {
      try {
        const [lessonsRes, examsRes, videosRes] = await Promise.all([
          supabase
            .from("lessons")
            .select("id, title, description, level_id, created_at")
            .order("created_at", { ascending: false })
            .limit(3),
          supabase
            .from("exams")
            .select("id, title, description, level_id, created_at")
            .order("created_at", { ascending: false })
            .limit(3),
          supabase
            .from("videos")
            .select("id, title, description, level_id, created_at")
            .order("created_at", { ascending: false })
            .limit(3),
        ]);

        const lessons: ContentItem[] = (lessonsRes.data || []).map((item) => ({
          ...item,
          type: "lesson" as const,
        }));
        const exams: ContentItem[] = (examsRes.data || []).map((item) => ({
          ...item,
          type: "exam" as const,
        }));
        const videos: ContentItem[] = (videosRes.data || []).map((item) => ({
          ...item,
          type: "video" as const,
        }));

        const allContent = [...lessons, ...exams, ...videos]
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 6);

        setContent(allContent);
      } catch (error) {
        console.error("Error fetching recent content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentContent();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (content.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Clock className="w-4 h-4" />
            آخر الإضافات
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            المحتوى المضاف حديثاً
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            تابع أحدث الدروس والامتحانات والفيديوهات المضافة
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item, index) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;
            const href =
              item.type === "lesson"
                ? "/lessons"
                : item.type === "exam"
                ? "/exams"
                : "/videos";

            return (
              <Card
                key={item.id}
                className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  {/* Type Badge & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className={config.color}>
                      <Icon className="w-3 h-3 ml-1" />
                      {config.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(item.created_at)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  {item.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {item.description}
                    </p>
                  )}

                  {/* Level & Link */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">
                      {getLevelName(item.level_id)}
                    </span>
                    <Link
                      to={href}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      عرض الكل
                      <ArrowLeft className="w-3 h-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentContentSection;
