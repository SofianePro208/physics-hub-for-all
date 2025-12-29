import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, FileText, Video, MessageSquare, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface Stats {
  lessons: number;
  exams: number;
  videos: number;
  messages: number;
}

interface TrimesterStats {
  trimester1: { lessons: number; exams: number; videos: number };
  trimester2: { lessons: number; exams: number; videos: number };
  trimester3: { lessons: number; exams: number; videos: number };
}

interface AdminStatsCardsProps {
  refreshTrigger?: number;
}

const COLORS = ["#3b82f6", "#f59e0b", "#06b6d4", "#22c55e"];

const AdminStatsCards = ({ refreshTrigger }: AdminStatsCardsProps) => {
  const [stats, setStats] = useState<Stats>({ lessons: 0, exams: 0, videos: 0, messages: 0 });
  const [trimesterStats, setTrimesterStats] = useState<TrimesterStats>({
    trimester1: { lessons: 0, exams: 0, videos: 0 },
    trimester2: { lessons: 0, exams: 0, videos: 0 },
    trimester3: { lessons: 0, exams: 0, videos: 0 },
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const [lessonsRes, examsRes, videosRes, messagesRes] = await Promise.all([
        supabase.from("lessons").select("id, trimester"),
        supabase.from("exams").select("id, trimester"),
        supabase.from("videos").select("id, trimester"),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
      ]);

      const lessons = lessonsRes.data || [];
      const exams = examsRes.data || [];
      const videos = videosRes.data || [];

      setStats({
        lessons: lessons.length,
        exams: exams.length,
        videos: videos.length,
        messages: messagesRes.count || 0,
      });

      // Calculate trimester stats
      const calcTrimester = (items: any[], t: number) => items.filter(i => (i.trimester || 1) === t).length;
      
      setTrimesterStats({
        trimester1: {
          lessons: calcTrimester(lessons, 1),
          exams: calcTrimester(exams, 1),
          videos: calcTrimester(videos, 1),
        },
        trimester2: {
          lessons: calcTrimester(lessons, 2),
          exams: calcTrimester(exams, 2),
          videos: calcTrimester(videos, 2),
        },
        trimester3: {
          lessons: calcTrimester(lessons, 3),
          exams: calcTrimester(exams, 3),
          videos: calcTrimester(videos, 3),
        },
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats, refreshTrigger]);

  useEffect(() => {
    const channel = supabase
      .channel('admin-stats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'lessons' }, () => fetchStats())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'exams' }, () => fetchStats())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'videos' }, () => fetchStats())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, () => fetchStats())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchStats]);

  const statsConfig = [
    { label: "الدروس", value: stats.lessons, icon: BookOpen, color: "bg-blue-500/10 text-blue-500", borderColor: "border-blue-500/20" },
    { label: "الامتحانات", value: stats.exams, icon: FileText, color: "bg-amber-500/10 text-amber-500", borderColor: "border-amber-500/20" },
    { label: "الفيديوهات", value: stats.videos, icon: Video, color: "bg-cyan-500/10 text-cyan-500", borderColor: "border-cyan-500/20" },
    { label: "الرسائل", value: stats.messages, icon: MessageSquare, color: "bg-green-500/10 text-green-500", borderColor: "border-green-500/20" },
  ];

  const pieData = [
    { name: "الدروس", value: stats.lessons },
    { name: "الامتحانات", value: stats.exams },
    { name: "الفيديوهات", value: stats.videos },
    { name: "الرسائل", value: stats.messages },
  ].filter(d => d.value > 0);

  const barData = [
    { name: "الفصل الأول", lessons: trimesterStats.trimester1.lessons, exams: trimesterStats.trimester1.exams, videos: trimesterStats.trimester1.videos },
    { name: "الفصل الثاني", lessons: trimesterStats.trimester2.lessons, exams: trimesterStats.trimester2.exams, videos: trimesterStats.trimester2.videos },
    { name: "الفصل الثالث", lessons: trimesterStats.trimester3.lessons, exams: trimesterStats.trimester3.exams, videos: trimesterStats.trimester3.videos },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6 mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
        <div className="grid lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsConfig.map((stat) => (
          <Card 
            key={stat.label} 
            className={`border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${stat.borderColor} border-r-4`}
          >
            <CardContent className="p-6">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              توزيع المحتوى
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '0.5rem',
                      direction: 'rtl'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart - Trimester Distribution */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              المحتوى حسب الفصل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '0.5rem',
                      direction: 'rtl'
                    }} 
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px' }} />
                  <Bar dataKey="lessons" name="دروس" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="exams" name="امتحانات" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="videos" name="فيديوهات" fill="#06b6d4" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStatsCards;
