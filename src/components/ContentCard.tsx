import { Link } from "react-router-dom";
import { BookOpen, FileText, Video, Download, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentCardProps {
  type: "lesson" | "exam" | "video";
  title: string;
  description: string;
  level: string;
  href: string;
  downloadUrl?: string;
  delay?: number;
}

const typeConfig = {
  lesson: {
    icon: BookOpen,
    label: "درس",
    color: "bg-physics-blue/10 text-physics-blue",
  },
  exam: {
    icon: FileText,
    label: "امتحان",
    color: "bg-physics-gold/10 text-physics-gold",
  },
  video: {
    icon: Video,
    label: "فيديو",
    color: "bg-physics-cyan/10 text-physics-cyan",
  },
};

const ContentCard = ({ type, title, description, level, href, downloadUrl, delay = 0 }: ContentCardProps) => {
  const config = typeConfig[type];

  return (
    <div
      className="group bg-card rounded-2xl border border-border/50 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-start justify-between gap-4">
          <div className={`w-12 h-12 rounded-xl ${config.color} flex items-center justify-center shrink-0`}>
            <config.icon className="w-6 h-6" />
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
            {config.label}
          </span>
        </div>
        <h3 className="text-lg font-bold text-foreground mt-4 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="p-4 bg-muted/30 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{level}</span>
        <div className="flex items-center gap-2">
          {downloadUrl && (
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href={downloadUrl} download>
                <Download className="w-4 h-4" />
              </a>
            </Button>
          )}
          <Link to={href}>
            <Button variant="ghost" size="sm" className="gap-1 text-primary">
              عرض
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
