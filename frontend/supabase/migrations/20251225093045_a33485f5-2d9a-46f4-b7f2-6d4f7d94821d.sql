-- Add restrictive SELECT policy to prevent public access to contact messages
-- Only authenticated admins should be able to read contact submissions
CREATE POLICY "No public read access to contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (false);