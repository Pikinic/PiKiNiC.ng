import { apiFetch } from "@/lib/admin/api/client";
import type { MediaItem } from "@/lib/admin/types";

export function listMediaItems() {
  return apiFetch<MediaItem[]>("/api/admin/media");
}

export function uploadMediaItem(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return apiFetch<MediaItem>("/api/admin/media", { method: "POST", body: formData });
}

export function deleteMediaItem(id: string) {
  return apiFetch<{ ok: true }>(`/api/admin/media/${encodeURIComponent(id)}`, { method: "DELETE" });
}
