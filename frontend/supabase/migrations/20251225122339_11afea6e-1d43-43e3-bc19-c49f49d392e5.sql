-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  avatar_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create a trigger to validate rating instead of CHECK constraint
CREATE OR REPLACE FUNCTION public.validate_testimonial_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.rating < 1 OR NEW.rating > 5 THEN
    RAISE EXCEPTION 'Rating must be between 1 and 5';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER validate_testimonial_rating_trigger
BEFORE INSERT OR UPDATE ON public.testimonials
FOR EACH ROW EXECUTE FUNCTION public.validate_testimonial_rating();

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public can read testimonials
CREATE POLICY "Testimonials are viewable by everyone"
ON public.testimonials
FOR SELECT
USING (true);

-- Admins can insert testimonials
CREATE POLICY "Admins can insert testimonials"
ON public.testimonials
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update testimonials
CREATE POLICY "Admins can update testimonials"
ON public.testimonials
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete testimonials
CREATE POLICY "Admins can delete testimonials"
ON public.testimonials
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));