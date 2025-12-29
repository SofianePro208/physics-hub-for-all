import { useState, useMemo } from "react";
import { Search, BookOpen, FileText, Video, X } from "lucide-react";
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

interface ContentItem {
  id: number;
  title: string;
  description: string;
  level: string;
  levelId: string;
  type: "lesson" | "exam" | "video";
}

const allContent: ContentItem[] = [
  // الدروس
  { id: 1, title: "الحركة والسكون", description: "دراسة المرجع والمعلم في الفيزياء", level: "السنة الأولى ثانوي", levelId: "1as", type: "lesson" },
  { id: 2, title: "السرعة المتوسطة واللحظية", description: "حساب السرعة في الحركات المختلفة", level: "السنة الأولى ثانوي", levelId: "1as", type: "lesson" },
  { id: 3, title: "القوة والحركة", description: "العلاقة بين القوة والتسارع", level: "السنة الأولى ثانوي", levelId: "1as", type: "lesson" },
  { id: 4, title: "القوى والتوازن", description: "شروط توازن جسم صلب", level: "السنة الثانية - علوم تجريبية", levelId: "2as-se", type: "lesson" },
  { id: 5, title: "العمل والطاقة", description: "العمل الميكانيكي والطاقة الحركية", level: "السنة الثانية - علوم تجريبية", levelId: "2as-se", type: "lesson" },
  { id: 6, title: "الطاقة الحركية والكامنة", description: "أشكال الطاقة وتحولاتها", level: "السنة الثانية - رياضيات", levelId: "2as-mt", type: "lesson" },
  { id: 7, title: "كمية الحركة", description: "انحفاظ كمية الحركة والتصادمات", level: "السنة الثانية - رياضيات", levelId: "2as-mt", type: "lesson" },
  { id: 8, title: "الظواهر الكهربائية", description: "الدارات الكهربائية والقوانين الأساسية", level: "السنة الثالثة - علوم تجريبية", levelId: "3as-se", type: "lesson" },
  { id: 9, title: "تطور جملة كيميائية", description: "التحولات الكيميائية والتقدم", level: "السنة الثالثة - علوم تجريبية", levelId: "3as-se", type: "lesson" },
  { id: 10, title: "الموجات الميكانيكية", description: "انتشار الموجات وخصائصها", level: "السنة الثالثة - رياضيات", levelId: "3as-mt", type: "lesson" },
  { id: 11, title: "الموجات الكهرومغناطيسية", description: "الضوء والظواهر الموجية", level: "السنة الثالثة - رياضيات", levelId: "3as-mt", type: "lesson" },
  // الامتحانات
  { id: 101, title: "فرض الفصل الأول - 1 ثانوي", description: "امتحان شامل للفصل الأول", level: "السنة الأولى ثانوي", levelId: "1as", type: "exam" },
  { id: 102, title: "اختبار الفصل الأول - 1 ثانوي", description: "الاختبار الفصلي مع الحل", level: "السنة الأولى ثانوي", levelId: "1as", type: "exam" },
  { id: 103, title: "بكالوريا 2023 - علوم تجريبية", description: "موضوع بكالوريا 2023 مع الحل", level: "السنة الثالثة - علوم تجريبية", levelId: "3as-se", type: "exam" },
  { id: 104, title: "بكالوريا 2022 - رياضيات", description: "موضوع بكالوريا 2022 مع الحل", level: "السنة الثالثة - رياضيات", levelId: "3as-mt", type: "exam" },
  { id: 105, title: "بكالوريا 2023 - رياضيات", description: "موضوع بكالوريا 2023 مع الحل", level: "السنة الثالثة - رياضيات", levelId: "3as-mt", type: "exam" },
  // الفيديوهات
  { id: 201, title: "شرح الحركة المستقيمة", description: "فيديو تعليمي مفصل عن الحركة", level: "السنة الأولى ثانوي", levelId: "1as", type: "video" },
  { id: 202, title: "تجربة سقوط الأجسام", description: "تجربة عملية مع الشرح", level: "السنة الأولى ثانوي", levelId: "1as", type: "video" },
  { id: 203, title: "حل تمارين التوازن", description: "تمارين محلولة عن التوازن", level: "السنة الثانية - علوم تجريبية", levelId: "2as-se", type: "video" },
  { id: 204, title: "شرح الظواهر الكهربائية", description: "الدارات الكهربائية بالتفصيل", level: "السنة الثالثة - علوم تجريبية", levelId: "3as-se", type: "video" },
  { id: 205, title: "تصحيح بكالوريا 2023", description: "حل موضوع بكالوريا كامل", level: "السنة الثالثة - رياضيات", levelId: "3as-mt", type: "video" },
];

const typeConfig = {
  lesson: { icon: BookOpen, label: "درس", color: "bg-physics-blue/10 text-physics-blue" },
  exam: { icon: FileText, label: "امتحان", color: "bg-physics-gold/10 text-physics-gold" },
  video: { icon: Video, label: "فيديو", color: "bg-physics-purple/10 text-physics-purple" },
};

const SearchDialog = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "lesson" | "exam" | "video">("all");

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    
    return allContent.filter((item) => {
      const matchesQuery = 
        item.title.includes(query) || 
        item.description.includes(query) ||
        item.level.includes(query);
      const matchesFilter = filter === "all" || item.type === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  const getItemLink = (item: ContentItem) => {
    return `/level/${item.levelId}`;
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
              placeholder="ابحث عن درس، امتحان، أو فيديو..."
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
              <p className="text-muted-foreground">اكتب للبحث في الدروس والامتحانات والفيديوهات</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
