import { Link } from "react-router-dom";
import { BookOpen, FileText, Video, Download, ChevronLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${href}` : href;

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = `${title}\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleFacebookShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank", "width=600,height=400");
  };

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: "تم نسخ الرابط" });
    } catch {
      toast({ title: "خطأ في نسخ الرابط", variant: "destructive" });
    }
  };

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
        <div className="flex items-center gap-1">
          {/* Share Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={handleWhatsAppShare} className="gap-2 cursor-pointer">
                <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                واتساب
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleFacebookShare} className="gap-2 cursor-pointer">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                فيسبوك
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyLink} className="gap-2 cursor-pointer">
                <Share2 className="w-4 h-4" />
                نسخ الرابط
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
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
