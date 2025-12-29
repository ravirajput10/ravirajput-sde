import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/api/projects";
import { fetchProjectBySlug } from "@/api/projects";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ["projects", slug],
    queryFn: () => fetchProjectBySlug(slug),
    enabled: !!slug,
  });
}

