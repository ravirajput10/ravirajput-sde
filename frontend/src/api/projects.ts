import { supabase } from "@/integrations/supabase/client";
import type { Project } from "./types";
// import { Project } from "@/types/portfolio";

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function fetchProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}
