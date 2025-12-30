import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import { Atom, LogOut, BookOpen, FileText, Video, MessageSquare, Plus } from "lucide-react";
import ContentSkeleton from "@/components/ContentSkeleton";
import AdminMessagesTab from "@/components/admin/AdminMessagesTab";
import AdminContentTab from "@/components/admin/AdminContentTab";
import AdminContentForm from "@/components/admin/AdminContentForm";
import AdminStatsCards from "@/components/admin/AdminStatsCards";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("messages");
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<"lesson" | "exam" | "video">("lesson");
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      if (!session) {
        navigate("/admin/login");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      if (!session) {
        navigate("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "تم تسجيل الخروج بنجاح" });
    navigate("/admin/login");
  };

  const openAddForm = (type: "lesson" | "exam" | "video") => {
    setFormType(type);
    setEditingItem(null);
    setShowForm(true);
  };

  const openEditForm = (type: "lesson" | "exam" | "video", item: any) => {
    setFormType(type);
    setEditingItem(item);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <ContentSkeleton type="hero" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="لوحة التحكم" description="لوحة تحكم المشرف" />
      
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                <Atom className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-foreground">لوحة التحكم</h1>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <AdminStatsCards />
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <TabsList className="grid grid-cols-4 h-12">
              <TabsTrigger value="messages" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">الرسائل</span>
              </TabsTrigger>
              <TabsTrigger value="lessons" className="gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">الدروس</span>
              </TabsTrigger>
              <TabsTrigger value="exams" className="gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">الامتحانات</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="gap-2">
                <Video className="w-4 h-4" />
                <span className="hidden sm:inline">الفيديوهات</span>
              </TabsTrigger>
            </TabsList>

            {activeTab !== "messages" && (
              <Button 
                onClick={() => {
                  const typeMap: Record<string, "lesson" | "exam" | "video"> = {
                    lessons: "lesson",
                    exams: "exam",
                    videos: "video"
                  };
                  openAddForm(typeMap[activeTab]);
                }}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة {activeTab === "lessons" ? "درس" : activeTab === "exams" ? "امتحان" : "فيديو"}
              </Button>
            )}
          </div>

          <TabsContent value="messages">
            <AdminMessagesTab />
          </TabsContent>

          <TabsContent value="lessons">
            <AdminContentTab type="lesson" onEdit={(item) => openEditForm("lesson", item)} />
          </TabsContent>

          <TabsContent value="exams">
            <AdminContentTab type="exam" onEdit={(item) => openEditForm("exam", item)} />
          </TabsContent>

          <TabsContent value="videos">
            <AdminContentTab type="video" onEdit={(item) => openEditForm("video", item)} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Add/Edit Form Dialog */}
      {showForm && (
        <AdminContentForm
          type={formType}
          item={editingItem}
          onClose={closeForm}
          onSuccess={() => {
            closeForm();
            toast({ title: editingItem ? "تم التحديث بنجاح" : "تمت الإضافة بنجاح" });
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
