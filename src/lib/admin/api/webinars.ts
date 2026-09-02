import { apiFetch } from "@/lib/admin/api/client";
import type { Webinar } from "@/lib/admin/types";

export function listWebinars() {
  return apiFetch<Webinar[]>("/api/admin/webinars");
}

export function getWebinar(slug: string) {
  return apiFetch<Webinar>(`/api/admin/webinars/${encodeURIComponent(slug)}`);
}

export function createWebinar(data: Webinar) {
  return apiFetch<Webinar>("/api/admin/webinars", { method: "POST", body: JSON.stringify(data) });
}

export function updateWebinar(slug: string, data: Partial<Webinar>) {
  return apiFetch<Webinar>(`/api/admin/webinars/${encodeURIComponent(slug)}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteWebinar(slug: string) {
  return apiFetch<{ ok: true }>(`/api/admin/webinars/${encodeURIComponent(slug)}`, { method: "DELETE" });
}
