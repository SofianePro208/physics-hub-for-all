import { Link } from "react-router-dom";
import { BookOpen, FileText, Video, ChevronLeft } from "lucide-react";
import { useRelatedContent } from "@/hooks/useContentQueries";

interface RelatedContentProps {
  type: "lessons" | "exams" | "videos";
  levelId: string;
  currentId: string;
}

const typeConfig = {
  lessons: {
    icon: BookOpen,
    label: "دروس مشابهة",
    singularLabel: "درس",
    path: "lesson",
    color: "from-physics-blue to-physics-purple",
    bgColor: "bg-physics-blue/10",
    textColor: "text-physics-blue",
  },
  exams: {
    icon: FileText,
    label: "امتحانات مشابهة",
    singularLabel: "امتحان",
    path: "exam",
    color: "from-physics-gold to-physics-cyan",
    bgColor: "bg-physics-gold/10",
    textColor: "text-physics-gold",
  },
  videos: {
    icon: Video,
    label: "فيديوهات مشابهة",
    singularLabel: "فيديو",
    path: "video",
    color: "from-physics-cyan to-physics-blue",
    bgColor: "bg-physics-cyan/10",
    textColor: "text-physics-cyan",
  },
};

const RelatedContent = ({ type, levelId, currentId }: RelatedContentProps) => {
  const { data: relatedItems, isLoading } = useRelatedContent(type, levelId, currentId, 3);
  const config = typeConfig[type];
  const Icon = config.icon;

  if (isLoading) {
    return (
      <div className="mt-12 pt-8 border-t border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground">{config.label}</h3>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-muted/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!relatedItems || relatedItems.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{config.label}</h3>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedItems.map((item, index) => (
          <Link
            key={item.id}
            to={`/content/${config.path}/${item.id}`}
            className="group relative bg-card border border-border/50 rounded-2xl p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Gradient line */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.color} opacity-60`} />
            
            {/* Content */}
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl ${config.bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-5 h-5 ${config.textColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
            
            {/* View link */}
            <div className="flex justify-end mt-4">
              <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                عرض
                <ChevronLeft className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedContent;
