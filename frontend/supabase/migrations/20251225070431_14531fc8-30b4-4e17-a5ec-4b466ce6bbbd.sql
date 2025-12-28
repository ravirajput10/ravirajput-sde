-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create experiences table
CREATE TABLE public.experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  achievements TEXT[] NOT NULL DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Projects and experiences are public read (portfolio content)
CREATE POLICY "Projects are viewable by everyone" 
ON public.projects 
FOR SELECT 
USING (true);

CREATE POLICY "Experiences are viewable by everyone" 
ON public.experiences 
FOR SELECT 
USING (true);

-- Contact messages can be inserted by anyone (public form)
CREATE POLICY "Anyone can submit contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);