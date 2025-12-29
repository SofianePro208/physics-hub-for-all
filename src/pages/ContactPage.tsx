import { useState } from "react";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(2, "الاسم يجب أن يكون حرفين على الأقل").max(100, "الاسم طويل جداً"),
  email: z.string().trim().email("البريد الإلكتروني غير صالح").max(255, "البريد الإلكتروني طويل جداً"),
  subject: z.string().trim().min(5, "الموضوع يجب أن يكون 5 أحرف على الأقل").max(200, "الموضوع طويل جداً"),
  message: z.string().trim().min(20, "الرسالة يجب أن تكون 20 حرف على الأقل").max(2000, "الرسالة طويلة جداً"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: Mail, title: "البريد الإلكتروني", value: "sofiane.l.kalem@ens-lagh.dz", description: "راسلنا في أي وقت" },
  { icon: Phone, title: "الهاتف", value: "+213 658 787 555", description: "من الأحد إلى الخميس" },
  { icon: Clock, title: "أوقات العمل", value: "8:00 - 18:00", description: "التوقيت المحلي الجزائري" },
  { icon: MapPin, title: "العنوان", value: "مستغانم، الجزائر", description: "منصة تعليمية عبر الإنترنت" },
];

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) fieldErrors[error.path[0] as keyof ContactFormData] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await supabase.from("contact_messages").insert({
      name: result.data.name,
      email: result.data.email,
      subject: result.data.subject,
      message: result.data.message,
    });
    
    setIsSubmitting(false);
    
    if (error) {
      toast({ title: "حدث خطأ", description: "فشل إرسال الرسالة. حاول مرة أخرى.", variant: "destructive" });
      return;
    }

    setIsSuccess(true);
    toast({ title: "تم إرسال رسالتك بنجاح!", description: "سنرد عليك في أقرب وقت ممكن." });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="اتصل بنا" description="تواصل معنا لأي استفسار أو اقتراح. نحن هنا لمساعدتك في رحلتك التعليمية." keywords="اتصل بنا, تواصل, دعم, مساعدة, منصة فيزياء" />
      <Header />
      
      <main className="pt-24 lg:pt-28">
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <PageBreadcrumb items={[{ label: "اتصل بنا" }]} className="mb-8" variant="light" />
            <div className="max-w-3xl animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">تواصل معنا</h1>
              <p className="text-xl text-white/80">نحن هنا لمساعدتك! أرسل لنا استفساراتك وسنرد عليك في أقرب وقت</p>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="lg:col-span-1 space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-card rounded-2xl border border-border/50 p-6 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{info.title}</h3>
                        <p className="text-primary font-medium mt-1">{info.value}</p>
                        <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  {isSuccess ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">شكراً لتواصلك!</h3>
                      <p className="text-muted-foreground mb-6">تم استلام رسالتك بنجاح. سنرد عليك في أقرب وقت ممكن.</p>
                      <Button onClick={() => setIsSuccess(false)}>إرسال رسالة أخرى</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">الاسم الكامل</Label>
                          <Input id="name" name="name" placeholder="أدخل اسمك الكامل" value={formData.name} onChange={handleChange} className={errors.name ? "border-destructive" : ""} />
                          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">البريد الإلكتروني</Label>
                          <Input id="email" name="email" type="email" placeholder="example@email.com" value={formData.email} onChange={handleChange} className={errors.email ? "border-destructive" : ""} />
                          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">الموضوع</Label>
                        <Input id="subject" name="subject" placeholder="ما هو موضوع رسالتك؟" value={formData.subject} onChange={handleChange} className={errors.subject ? "border-destructive" : ""} />
                        {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">الرسالة</Label>
                        <Textarea id="message" name="message" placeholder="اكتب رسالتك هنا..." rows={6} value={formData.message} onChange={handleChange} className={errors.message ? "border-destructive" : ""} />
                        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                      </div>
                      <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                        {isSubmitting ? (<><div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />جاري الإرسال...</>) : (<><Send className="w-5 h-5" />إرسال الرسالة</>)}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ContactPage;
