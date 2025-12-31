import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { X, Upload, FileText, Loader2 } from "lucide-react";

interface AdminBacFormProps {
  item?: any;
  onClose: () => void;
  onSuccess: () => void;
}

const branches = [
  { id: "se", label: "شعبة العلوم التجريبية" },
  { id: "mt", label: "شعبة الرياضيات والتقني رياضي" },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

const AdminBacForm = ({ item, onClose, onSuccess }: AdminBacFormProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const solutionFileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");
  const [year, setYear] = useState<string>(item?.year?.toString() || currentYear.toString());
  const [branch, setBranch] = useState(item?.branch || "se");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [solutionFile, setSolutionFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({ 
        title: "خطأ", 
        description: "حجم الملف كبير جداً. الحد الأقصى 10 ميجابايت", 
        variant: "destructive" 
      });
      return null;
    }

    const fileName = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    
    const { error } = await supabase.storage.from("content").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      console.error("Upload error:", error);
      toast({ 
        title: "خطأ في الرفع", 
        description: error.message, 
        variant: "destructive" 
      });
      return null;
    }

    const { data } = supabase.storage.from("content").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !branch || !year) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول المطلوبة", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      let pdfUrl = item?.pdf_url || null;
      let solutionPdfUrl = item?.solution_pdf_url || null;

      if (pdfFile) {
        setUploadProgress("جاري رفع الملف...");
        pdfUrl = await uploadFile(pdfFile, "bac");
        if (!pdfUrl) {
          throw new Error("فشل رفع الملف");
        }
      }

      if (solutionFile) {
        setUploadProgress("جاري رفع ملف الحل...");
        solutionPdfUrl = await uploadFile(solutionFile, "bac-solutions");
        if (!solutionPdfUrl) {
          throw new Error("فشل رفع ملف الحل");
        }
      }

      setUploadProgress("جاري الحفظ...");

      const data = {
        title: title.trim(),
        description: description.trim() || null,
        year: parseInt(year),
        branch,
        pdf_url: pdfUrl,
        solution_pdf_url: solutionPdfUrl,
      };

      let error;
      if (item) {
        const result = await supabase.from("bac_exams").update(data).eq("id", item.id);
        error = result.error;
      } else {
        const result = await supabase.from("bac_exams").insert(data);
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-2xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">
            {item ? "تعديل موضوع بكالوريا" : "إضافة موضوع بكالوريا"}
          </h2>
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
              placeholder="مثال: بكالوريا 2024 - الدورة العادية"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">الوصف</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="وصف مختصر للموضوع"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>السنة *</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر السنة" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>الشعبة *</Label>
              <Select value={branch} onValueChange={setBranch}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الشعبة" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>ملف PDF الموضوع</Label>
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
            {item?.solution_pdf_url && !solutionFile && (
              <p className="text-sm text-muted-foreground">ملف حل حالي موجود</p>
            )}
          </div>

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

export default AdminBacForm;
