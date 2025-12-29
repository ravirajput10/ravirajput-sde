import { supabase } from "@/integrations/supabase/client";
import type { Blog } from "./types";

/**
 * Public blogs (only published)
 */
export async function fetchBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data ?? [];
}

/**
 * Blog detail by slug (published only)
 */
export async function fetchBlogBySlug(slug: string): Promise<Blog> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (!data) throw new Error(`Blog with slug "${slug}" not found`);

  return data;
}

/**
 * Admin: all blogs (draft + published)
 */
export async function fetchBlogsAdmin(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data ?? [];
}
