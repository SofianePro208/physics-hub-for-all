import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Trash2, Calendar, User } from "lucide-react";
import ContentSkeleton from "@/components/ContentSkeleton";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

const AdminMessagesTab = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "خطأ", description: "فشل تحميل الرسائل", variant: "destructive" });
    } else {
      setMessages(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    
    if (error) {
      toast({ title: "خطأ", description: "فشل حذف الرسالة", variant: "destructive" });
    } else {
      setMessages(messages.filter((m) => m.id !== id));
      toast({ title: "تم حذف الرسالة بنجاح" });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-DZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return <ContentSkeleton count={4} type="list" />;
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-border/50">
        <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2">لا توجد رسائل</h3>
        <p className="text-muted-foreground">ستظهر الرسائل هنا عندما يتواصل معك أحد</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">الرسائل الواردة</h2>
        <Badge variant="secondary">{messages.length} رسالة</Badge>
      </div>

      {messages.map((message) => (
        <div
          key={message.id}
          className="bg-card rounded-xl border border-border/50 p-6 shadow-card hover:shadow-card-hover transition-all"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-foreground truncate">{message.subject}</h3>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {message.name}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {message.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(message.created_at)}
                </span>
              </div>

              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {message.message}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(`mailto:${message.email}?subject=رد: ${message.subject}`, "_blank")}
                className="text-primary hover:text-primary"
              >
                <Mail className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(message.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminMessagesTab;
