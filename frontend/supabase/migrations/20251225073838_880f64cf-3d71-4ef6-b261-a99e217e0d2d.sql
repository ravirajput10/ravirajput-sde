-- Create blogs table for technical articles
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  cover_image TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  read_time INTEGER NOT NULL DEFAULT 5,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Blogs are viewable by everyone"
ON public.blogs
FOR SELECT
USING (true);

-- Insert sample blog posts
INSERT INTO public.blogs (title, excerpt, tags, read_time, cover_image) VALUES
('Building Scalable React Applications with Redux Toolkit', 'Learn how to structure large-scale React applications using Redux Toolkit for state management, including best practices for code splitting and performance optimization.', ARRAY['React', 'Redux', 'TypeScript'], 8, NULL),
('A Complete Guide to Node.js Authentication with JWT', 'Explore secure authentication patterns in Node.js applications using JSON Web Tokens, refresh tokens, and best security practices.', ARRAY['Node.js', 'Security', 'JWT'], 12, NULL),
('Mastering TypeScript: Advanced Types and Patterns', 'Deep dive into TypeScript''s advanced type system including generics, conditional types, mapped types, and real-world design patterns.', ARRAY['TypeScript', 'JavaScript'], 10, NULL),
('Deploying Full-Stack Apps with Docker and AWS', 'Step-by-step guide to containerizing your full-stack application and deploying it to AWS using ECS, RDS, and CloudFront.', ARRAY['Docker', 'AWS', 'DevOps'], 15, NULL);