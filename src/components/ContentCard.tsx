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

  const handleTelegramShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = `${title}`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleInstagramShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Instagram doesn't have a direct share URL, so we copy the link
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({ title: "تم نسخ الرابط - يمكنك لصقه في إنستغرام" });
    });
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
              <DropdownMenuItem onClick={handleFacebookShare} className="gap-2 cursor-pointer">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                فيسبوك
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleInstagramShare} className="gap-2 cursor-pointer">
                <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                إنستغرام
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleTelegramShare} className="gap-2 cursor-pointer">
                <svg className="w-4 h-4 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                تلغرام
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
