import { useState, useMemo } from "react";
import { Search, BookOpen, FileText, Video, X, Award } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLessons, useExams, useVideos } from "@/hooks/useContentQueries";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ContentItem {
  id: string;
  title: string;
  description: string | null;
  level: string;
  levelId: string;
  type: "lesson" | "exam" | "video" | "bac";
}

const typeConfig = {
  lesson: { icon: BookOpen, label: "درس", color: "bg-physics-blue/10 text-physics-blue" },
  exam: { icon: FileText, label: "امتحان", color: "bg-physics-gold/10 text-physics-gold" },
  video: { icon: Video, label: "فيديو", color: "bg-physics-purple/10 text-physics-purple" },
  bac: { icon: Award, label: "بكالوريا", color: "bg-green-500/10 text-green-500" },
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

const useBacExams = () => {
  return useQuery({
    queryKey: ["bac_exams"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bac_exams")
        .select("id, title, description, year, branch")
        .order("year", { ascending: false });
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

const SearchDialog = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "lesson" | "exam" | "video" | "bac">("all");

  // Fetch data from database
  const { data: lessons = [] } = useLessons();
  const { data: exams = [] } = useExams();
  const { data: videos = [] } = useVideos();
  const { data: bacExams = [] } = useBacExams();

  // Transform data to unified format
  const allContent = useMemo((): ContentItem[] => {
    const lessonsItems: ContentItem[] = lessons.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      level: getLevelName(item.level_id),
      levelId: item.level_id,
      type: "lesson" as const,
    }));

    const examsItems: ContentItem[] = exams.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      level: getLevelName(item.level_id),
      levelId: item.level_id,
      type: "exam" as const,
    }));

    const videosItems: ContentItem[] = videos.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      level: getLevelName(item.level_id),
      levelId: item.level_id,
      type: "video" as const,
    }));

    const bacItems: ContentItem[] = bacExams.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description || `بكالوريا ${item.year}`,
      level: item.branch === "se" ? "علوم تجريبية" : "رياضيات وتقني رياضي",
      levelId: item.branch === "se" ? "3as-se" : "3as-mt",
      type: "bac" as const,
    }));

    return [...lessonsItems, ...examsItems, ...videosItems, ...bacItems];
  }, [lessons, exams, videos, bacExams]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    
    return allContent.filter((item) => {
      const matchesQuery = 
        item.title.includes(query) || 
        (item.description && item.description.includes(query)) ||
        item.level.includes(query);
      const matchesFilter = filter === "all" || item.type === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter, allContent]);

  const getItemLink = (item: ContentItem) => {
    if (item.type === "bac") {
      return `/content/bac/${item.id}`;
    }
    return `/content/${item.type}/${item.id}`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Search className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">البحث في المحتوى</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ابحث عن درس، امتحان، فيديو، أو بكالوريا..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-10 h-12 text-lg"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setQuery("")}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            <Badge
              variant={filter === "all" ? "default" : "outline"}
              className="cursor-pointer px-4 py-2"
              onClick={() => setFilter("all")}
            >
              الكل
            </Badge>
            <Badge
              variant={filter === "lesson" ? "default" : "outline"}
              className="cursor-pointer px-4 py-2"
              onClick={() => setFilter("lesson")}
            >
              <BookOpen className="w-3 h-3 ml-1" />
              الدروس
            </Badge>
            <Badge
              variant={filter === "exam" ? "default" : "outline"}
              className="cursor-pointer px-4 py-2"
              onClick={() => setFilter("exam")}
            >
              <FileText className="w-3 h-3 ml-1" />
              الامتحانات
            </Badge>
            <Badge
              variant={filter === "video" ? "default" : "outline"}
              className="cursor-pointer px-4 py-2"
              onClick={() => setFilter("video")}
            >
              <Video className="w-3 h-3 ml-1" />
              الفيديوهات
            </Badge>
            <Badge
              variant={filter === "bac" ? "default" : "outline"}
              className="cursor-pointer px-4 py-2"
              onClick={() => setFilter("bac")}
            >
              <Award className="w-3 h-3 ml-1" />
              البكالوريا
            </Badge>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto mt-4 -mx-6 px-6">
          {query.trim() ? (
            filteredResults.length > 0 ? (
              <div className="space-y-2">
                {filteredResults.map((item) => {
                  const config = typeConfig[item.type];
                  const Icon = config.icon;
                  return (
                    <Link
                      key={`${item.type}-${item.id}`}
                      to={getItemLink(item)}
                      onClick={() => setOpen(false)}
                      className="flex items-start gap-4 p-4 rounded-xl border border-border/50 hover:bg-muted/50 hover:border-primary/30 transition-all group"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${config.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                            {item.title}
                          </h4>
                          <Badge variant="secondary" className="text-xs shrink-0">
                            {config.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">{item.level}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">لا توجد نتائج لـ "{query}"</p>
                <p className="text-sm text-muted-foreground/70 mt-1">جرب كلمات بحث مختلفة</p>
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">اكتب للبحث في الدروس والامتحانات والفيديوهات والبكالوريا</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
