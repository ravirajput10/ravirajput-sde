import { useQuery } from "@tanstack/react-query";
import { fetchBlogBySlug, fetchBlogs } from "@/api/blogs";

export function useBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });
}

export function useBlog(slug: string) {
  return useQuery({
    queryKey: ["blogs", slug],
    queryFn: () => fetchBlogBySlug(slug),
    enabled: !!slug,
  });
}