-- Fix security warning: set search_path for generate_slug function
CREATE OR REPLACE FUNCTION public.generate_slug(title text)
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  RETURN lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$;