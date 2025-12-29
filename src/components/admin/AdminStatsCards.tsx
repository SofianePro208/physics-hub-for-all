import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, FileText, Video, MessageSquare, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Stats {
  lessons: number;
  exams: number;
  videos: number;
  messages: number;
}

const AdminStatsCards = () => {
  const [stats, setStats] = useState<Stats>({ lessons: 0, exams: 0, videos: 0, messages: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [lessonsRes, examsRes, videosRes, messagesRes] = await Promise.all([
          supabase.from("lessons").select("id", { count: "exact", head: true }),
          supabase.from("exams").select("id", { count: "exact", head: true }),
          supabase.from("videos").select("id", { count: "exact", head: true }),
          supabase.from("contact_messages").select("id", { count: "exact", head: true }),
        ]);

        setStats({
          lessons: lessonsRes.count || 0,
          exams: examsRes.count || 0,
          videos: videosRes.count || 0,
          messages: messagesRes.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsConfig = [
    {
      label: "الدروس",
      value: stats.lessons,
      icon: BookOpen,
      color: "bg-blue-500/10 text-blue-500",
      borderColor: "border-blue-500/20",
    },
    {
      label: "الامتحانات",
      value: stats.exams,
      icon: FileText,
      color: "bg-amber-500/10 text-amber-500",
      borderColor: "border-amber-500/20",
    },
    {
      label: "الفيديوهات",
      value: stats.videos,
      icon: Video,
      color: "bg-cyan-500/10 text-cyan-500",
      borderColor: "border-cyan-500/20",
    },
    {
      label: "الرسائل",
      value: stats.messages,
      icon: MessageSquare,
      color: "bg-green-500/10 text-green-500",
      borderColor: "border-green-500/20",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="p-6">
              <Skeleton className="h-12 w-12 rounded-xl mb-4" />
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsConfig.map((stat) => (
        <Card 
          key={stat.label} 
          className={`border-border/50 hover:shadow-lg transition-shadow ${stat.borderColor} border-r-4`}
        >
          <CardContent className="p-6">
            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminStatsCards;
