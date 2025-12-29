-- Add trimester column to lessons table
ALTER TABLE public.lessons 
ADD COLUMN trimester integer DEFAULT 1;

-- Add trimester column to videos table
ALTER TABLE public.videos 
ADD COLUMN trimester integer DEFAULT 1;