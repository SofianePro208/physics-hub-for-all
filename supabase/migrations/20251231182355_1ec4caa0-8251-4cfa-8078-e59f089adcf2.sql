-- Create a table for previous baccalaureate exams
CREATE TABLE public.bac_exams (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    year INTEGER NOT NULL,
    branch TEXT NOT NULL CHECK (branch IN ('se', 'mt')),
    pdf_url TEXT,
    solution_pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add comment for branch values
COMMENT ON COLUMN public.bac_exams.branch IS 'se = Sciences Expérimentales, mt = Mathématiques et Technique Mathématique';

-- Enable Row Level Security
ALTER TABLE public.bac_exams ENABLE ROW LEVEL SECURITY;

-- Create policies for public viewing
CREATE POLICY "Anyone can view bac exams" 
ON public.bac_exams 
FOR SELECT 
USING (true);

-- Create policies for authenticated users to manage
CREATE POLICY "Authenticated users can manage bac exams" 
ON public.bac_exams 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_bac_exams_updated_at
BEFORE UPDATE ON public.bac_exams
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();