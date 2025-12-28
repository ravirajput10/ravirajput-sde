-- Add slug column to blogs table
ALTER TABLE public.blogs ADD COLUMN slug text;

-- Add slug column to projects table
ALTER TABLE public.projects ADD COLUMN slug text;

-- Create function to generate slug from title
CREATE OR REPLACE FUNCTION public.generate_slug(title text)
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$;

-- Update existing blogs with generated slugs
UPDATE public.blogs SET slug = generate_slug(title) || '-' || substring(id::text, 1, 8) WHERE slug IS NULL;

-- Update existing projects with generated slugs
UPDATE public.projects SET slug = generate_slug(title) || '-' || substring(id::text, 1, 8) WHERE slug IS NULL;

-- Make slug columns NOT NULL and UNIQUE after populating
ALTER TABLE public.blogs ALTER COLUMN slug SET NOT NULL;
ALTER TABLE public.blogs ADD CONSTRAINT blogs_slug_unique UNIQUE (slug);

ALTER TABLE public.projects ALTER COLUMN slug SET NOT NULL;
ALTER TABLE public.projects ADD CONSTRAINT projects_slug_unique UNIQUE (slug);