import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { X, Upload, FileText, Loader2 } from "lucide-react";

interface AdminContentFormProps {
  type: "lesson" | "exam" | "video";
  item?: any;
  onClose: () => void;
  onSuccess: () => void;
}

const levels = [
  { id: "1as", label: "السنة الأولى ثانوي" },
  { id: "2as", label: "السنة الثانية ثانوي" },
  { id: "3as", label: "السنة الثالثة ثانوي" },
];

const trimesters = [
  { id: 1, label: "الفصل الأول" },
  { id: 2, label: "الفصل الثاني" },
  { id: 3, label: "الفصل الثالث" },
];

const examTypes = [
  { id: "assignment", label: "فرض" },
  { id: "test", label: "اختبار" },
  { id: "exercises", label: "سلسلة تمارين" },
];

const AdminContentForm = ({ type, item, onClose, onSuccess }: AdminContentFormProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const solutionFileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");
  const [levelId, setLevelId] = useState(item?.level_id || "");
  const [trimester, setTrimester] = useState<string>(item?.trimester?.toString() || "1");
  const [examType, setExamType] = useState(item?.exam_type || "test");
  const [youtubeUrl, setYoutubeUrl] = useState(item?.youtube_url || "");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [solutionFile, setSolutionFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  const tableName = type === "lesson" ? "lessons" : type === "exam" ? "exams" : "videos";

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    const fileName = `${folder}/${Date.now()}-${file.name}`;
    
    const { error } = await supabase.storage.from("content").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const { data } = supabase.storage.from("content").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !levelId) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول المطلوبة", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      let pdfUrl = item?.pdf_url || null;
      let solutionPdfUrl = item?.solution_pdf_url || null;

      // Upload PDF file if selected
      if (pdfFile) {
        setUploadProgress("جاري رفع ملف الدرس...");
        pdfUrl = await uploadFile(pdfFile, type === "lesson" ? "lessons" : "exams");
        if (!pdfUrl) {
          throw new Error("فشل رفع الملف");
        }
      }

      // Upload solution PDF if selected (for exams only)
      if (solutionFile && type === "exam") {
        setUploadProgress("جاري رفع ملف الحل...");
        solutionPdfUrl = await uploadFile(solutionFile, "solutions");
        if (!solutionPdfUrl) {
          throw new Error("فشل رفع ملف الحل");
        }
      }

      setUploadProgress("جاري الحفظ...");

      const data: any = {
        title: title.trim(),
        description: description.trim() || null,
        level_id: levelId,
        trimester: parseInt(trimester),
      };

      if (type === "video") {
        data.youtube_url = youtubeUrl.trim() || null;
      } else {
        data.pdf_url = pdfUrl;
        if (type === "exam") {
          data.solution_pdf_url = solutionPdfUrl;
          data.exam_type = examType;
        }
      }

      let error;
      if (item) {
        const result = await supabase.from(tableName).update(data).eq("id", item.id);
        error = result.error;
      } else {
        const result = await supabase.from(tableName).insert(data);
        error = result.error;
      }

      if (error) {
        throw error;
      }

      onSuccess();
    } catch (error: any) {
      toast({ title: "خطأ", description: error.message || "حدث خطأ أثناء الحفظ", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
      setUploadProgress("");
    }
  };

  const getTitle = () => {
    const action = item ? "تعديل" : "إضافة";
    switch (type) {
      case "lesson": return `${action} درس`;
      case "exam": return `${action} امتحان`;
      case "video": return `${action} فيديو`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-2xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">{getTitle()}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">العنوان *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`عنوان ${type === "lesson" ? "الدرس" : type === "exam" ? "الامتحان" : "الفيديو"}`}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">الوصف</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="وصف مختصر"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>المستوى الدراسي *</Label>
            <Select value={levelId} onValueChange={setLevelId}>
              <SelectTrigger>
                <SelectValue placeholder="اختر المستوى" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level.id} value={level.id}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className={type === "exam" ? "grid grid-cols-2 gap-4" : ""}>
            <div className="space-y-2">
              <Label>الفصل الدراسي *</Label>
              <Select value={trimester} onValueChange={setTrimester}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفصل" />
                </SelectTrigger>
                <SelectContent>
                  {trimesters.map((t) => (
                    <SelectItem key={t.id} value={t.id.toString()}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {type === "exam" && (
              <div className="space-y-2">
                <Label>نوع الامتحان *</Label>
                <Select value={examType} onValueChange={setExamType}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    {examTypes.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {type === "video" ? (
            <div className="space-y-2">
              <Label htmlFor="youtube">رابط يوتيوب</Label>
              <Input
                id="youtube"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label>ملف PDF {type === "lesson" ? "الدرس" : "الامتحان"}</Label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {pdfFile ? (
                    <>
                      <FileText className="w-4 h-4" />
                      {pdfFile.name}
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      {item?.pdf_url ? "تغيير الملف" : "رفع ملف PDF"}
                    </>
                  )}
                </Button>
                {item?.pdf_url && !pdfFile && (
                  <p className="text-sm text-muted-foreground">ملف حالي موجود</p>
                )}
              </div>

              {type === "exam" && (
                <div className="space-y-2">
                  <Label>ملف PDF الحل</Label>
                  <input
                    type="file"
                    ref={solutionFileInputRef}
                    accept=".pdf"
                    onChange={(e) => setSolutionFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => solutionFileInputRef.current?.click()}
                  >
                    {solutionFile ? (
                      <>
                        <FileText className="w-4 h-4" />
                        {solutionFile.name}
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        {item?.solution_pdf_url ? "تغيير ملف الحل" : "رفع ملف الحل"}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </>
          )}

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin ml-2" />
                  {uploadProgress || "جاري الحفظ..."}
                </>
              ) : (
                "حفظ"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              إلغاء
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminContentForm;
