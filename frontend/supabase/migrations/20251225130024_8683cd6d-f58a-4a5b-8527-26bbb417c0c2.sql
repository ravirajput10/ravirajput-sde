-- Add admin-only write policies for experiences table
CREATE POLICY "Admins can insert experiences" 
ON public.experiences 
FOR INSERT 
TO authenticated 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update experiences" 
ON public.experiences 
FOR UPDATE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin')) 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete experiences" 
ON public.experiences 
FOR DELETE 
TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));