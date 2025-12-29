import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ContentItem {
  id: string;
  title: string;
  description: string | null;
  level_id: string;
  trimester?: number | null;
  created_at?: string;
}

export interface ExamItem extends ContentItem {
  exam_type?: string | null;
  pdf_url?: string | null;
  solution_pdf_url?: string | null;
}

export interface VideoItem extends ContentItem {
  youtube_url?: string | null;
}

// Fetch lessons with caching
export const useLessons = (levelMatches?: string[]) => {
  return useQuery({
    queryKey: ["lessons", levelMatches],
    queryFn: async () => {
      let query = supabase
        .from("lessons")
        .select("id, title, description, level_id, trimester, created_at")
        .order("created_at", { ascending: false });

      if (levelMatches && levelMatches.length > 0) {
        query = query.in("level_id", levelMatches);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as ContentItem[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Fetch exams with caching
export const useExams = (levelMatches?: string[]) => {
  return useQuery({
    queryKey: ["exams", levelMatches],
    queryFn: async () => {
      let query = supabase
        .from("exams")
        .select("id, title, description, level_id, trimester, exam_type, created_at")
        .order("created_at", { ascending: false });

      if (levelMatches && levelMatches.length > 0) {
        query = query.in("level_id", levelMatches);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as ExamItem[];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

// Fetch videos with caching
export const useVideos = (levelMatches?: string[]) => {
  return useQuery({
    queryKey: ["videos", levelMatches],
    queryFn: async () => {
      let query = supabase
        .from("videos")
        .select("id, title, description, level_id, trimester, created_at")
        .order("created_at", { ascending: false });

      if (levelMatches && levelMatches.length > 0) {
        query = query.in("level_id", levelMatches);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as VideoItem[];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

// Fetch single content item
export const useContentItem = (type: "lessons" | "exams" | "videos", id: string) => {
  return useQuery({
    queryKey: [type, id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(type)
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    enabled: !!id,
  });
};

// Fetch related content (same level, different items)
export const useRelatedContent = (
  type: "lessons" | "exams" | "videos",
  levelId: string,
  currentId: string,
  limit: number = 3
) => {
  return useQuery({
    queryKey: ["related", type, levelId, currentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(type)
        .select("id, title, description, level_id")
        .eq("level_id", levelId)
        .neq("id", currentId)
        .limit(limit);

      if (error) throw error;
      return data as ContentItem[];
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: !!levelId && !!currentId,
  });
};
