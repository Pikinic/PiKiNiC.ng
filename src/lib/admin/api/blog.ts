import { apiFetch } from "@/lib/admin/api/client";
import type { BlogPost } from "@/lib/admin/types";

export function listBlogPosts() {
  return apiFetch<BlogPost[]>("/api/admin/blog");
}

export function getBlogPost(slug: string) {
  return apiFetch<BlogPost>(`/api/admin/blog/${encodeURIComponent(slug)}`);
}

export function createBlogPost(data: BlogPost) {
  return apiFetch<BlogPost>("/api/admin/blog", { method: "POST", body: JSON.stringify(data) });
}

export function updateBlogPost(slug: string, data: Partial<BlogPost>) {
  return apiFetch<BlogPost>(`/api/admin/blog/${encodeURIComponent(slug)}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteBlogPost(slug: string) {
  return apiFetch<{ ok: true }>(`/api/admin/blog/${encodeURIComponent(slug)}`, { method: "DELETE" });
}
