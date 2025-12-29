import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Download, ExternalLink, BookOpen, FileText, Video } from "lucide-react";
import ContentSkeleton from "@/components/ContentSkeleton";

interface AdminContentTabProps {
  type: "lesson" | "exam" | "video";
  onEdit: (item: any) => void;
}

const levelLabels: Record<string, string> = {
  "1as": "السنة الأولى ثانوي",
  "2as": "السنة الثانية ثانوي",
  "3as": "السنة الثالثة ثانوي",
};

const trimesterLabels: Record<number, string> = {
  1: "الفصل الأول",
  2: "الفصل الثاني",
  3: "الفصل الثالث",
};

const examTypeLabels: Record<string, string> = {
  "assignment": "فرض",
  "test": "اختبار",
  "exercises": "سلسلة تمارين",
};

const AdminContentTab = ({ type, onEdit }: AdminContentTabProps) => {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const tableName = type === "lesson" ? "lessons" : type === "exam" ? "exams" : "videos";

  const fetchItems = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "خطأ", description: "فشل تحميل البيانات", variant: "destructive" });
    } else {
      setItems(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [type]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from(tableName).delete().eq("id", id);
    
    if (error) {
      toast({ title: "خطأ", description: "فشل الحذف", variant: "destructive" });
    } else {
      setItems(items.filter((item) => item.id !== id));
      toast({ title: "تم الحذف بنجاح" });
    }
  };

  const getIcon = () => {
    switch (type) {
      case "lesson": return BookOpen;
      case "exam": return FileText;
      case "video": return Video;
    }
  };

  const Icon = getIcon();

  if (isLoading) {
    return <ContentSkeleton count={4} type="list" />;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-border/50">
        <Icon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2">
          لا يوجد {type === "lesson" ? "دروس" : type === "exam" ? "امتحانات" : "فيديوهات"}
        </h3>
        <p className="text-muted-foreground">اضغط على زر الإضافة لإنشاء محتوى جديد</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">
          {type === "lesson" ? "الدروس" : type === "exam" ? "الامتحانات" : "الفيديوهات"}
        </h2>
        <Badge variant="secondary">{items.length} عنصر</Badge>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-card rounded-xl border border-border/50 p-6 shadow-card hover:shadow-card-hover transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{levelLabels[item.level_id] || item.level_id}</Badge>
                    {type === "exam" && item.trimester && (
                      <Badge variant="secondary">{trimesterLabels[item.trimester]}</Badge>
                    )}
                    {type === "exam" && item.exam_type && (
                      <Badge className="bg-physics-gold/10 text-physics-gold border-physics-gold/20">
                        {examTypeLabels[item.exam_type] || item.exam_type}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                {item.pdf_url && (
                  <Button variant="ghost" size="icon" asChild>
                    <a href={item.pdf_url} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {item.youtube_url && (
                  <Button variant="ghost" size="icon" asChild>
                    <a href={item.youtube_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContentTab;
