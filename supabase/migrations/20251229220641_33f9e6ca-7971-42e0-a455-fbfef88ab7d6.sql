-- Add trimester and exam_type columns to exams table
ALTER TABLE public.exams 
ADD COLUMN trimester integer DEFAULT 1 CHECK (trimester IN (1, 2, 3)),
ADD COLUMN exam_type text DEFAULT 'test' CHECK (exam_type IN ('assignment', 'test', 'exercises'));

-- Add comments for clarity
COMMENT ON COLUMN public.exams.trimester IS 'Trimester: 1=First, 2=Second, 3=Third';
COMMENT ON COLUMN public.exams.exam_type IS 'Type: assignment=فرض, test=اختبار, exercises=سلسلة تمارين';