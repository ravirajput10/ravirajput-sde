-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for secure role management
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Add read_at column to contact_messages for tracking read status
ALTER TABLE public.contact_messages 
ADD COLUMN read_at timestamp with time zone DEFAULT NULL;

-- Drop existing SELECT policy on contact_messages
DROP POLICY IF EXISTS "No public read access to contact messages" ON public.contact_messages;

-- Create new policy: Only admins can read contact messages
CREATE POLICY "Admins can read contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update contact messages (for marking as read)
CREATE POLICY "Admins can update contact messages"
ON public.contact_messages
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete contact messages
CREATE POLICY "Admins can delete contact messages"
ON public.contact_messages
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));