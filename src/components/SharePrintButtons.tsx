import { Share2, Facebook, Instagram, Link as LinkIcon, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface SharePrintButtonsProps {
  title: string;
  description?: string;
  className?: string;
}

const SharePrintButtons = ({ title, description, className = "" }: SharePrintButtonsProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "تم نسخ الرابط",
        description: "يمكنك الآن مشاركته مع الآخرين",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "خطأ",
        description: "لم يتم نسخ الرابط",
        variant: "destructive",
      });
    }
  };

  const shareOnFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const shareOnInstagram = () => {
    // Instagram doesn't have a direct share URL, so we copy the link and open Instagram
    navigator.clipboard.writeText(url);
    toast({
      title: "تم نسخ الرابط",
      description: "يمكنك الآن لصقه في إنستغرام",
    });
    window.open("https://www.instagram.com", "_blank");
  };

  const shareOnTelegram = () => {
    const text = `${title}${description ? ` - ${description}` : ""}`;
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Share Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 print:hidden">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">مشاركة</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-popover">
          <DropdownMenuItem onClick={handleCopyLink} className="gap-3 cursor-pointer">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
            نسخ الرابط
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareOnFacebook} className="gap-3 cursor-pointer">
            <Facebook className="w-4 h-4 text-[#1877F2]" />
            فيسبوك
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareOnInstagram} className="gap-3 cursor-pointer">
            <Instagram className="w-4 h-4 text-[#E4405F]" />
            إنستغرام
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareOnTelegram} className="gap-3 cursor-pointer">
            <Send className="w-4 h-4 text-[#0088cc]" />
            تليجرام
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SharePrintButtons;
