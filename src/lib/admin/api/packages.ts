import { apiFetch } from "@/lib/admin/api/client";
import type { TravelPackage } from "@/lib/admin/types";

export function listPackages() {
  return apiFetch<TravelPackage[]>("/api/admin/packages");
}

export function getPackage(slug: string) {
  return apiFetch<TravelPackage>(`/api/admin/packages/${encodeURIComponent(slug)}`);
}

export function createPackage(data: TravelPackage) {
  return apiFetch<TravelPackage>("/api/admin/packages", { method: "POST", body: JSON.stringify(data) });
}

export function updatePackage(slug: string, data: Partial<TravelPackage>) {
  return apiFetch<TravelPackage>(`/api/admin/packages/${encodeURIComponent(slug)}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deletePackage(slug: string) {
  return apiFetch<{ ok: true }>(`/api/admin/packages/${encodeURIComponent(slug)}`, { method: "DELETE" });
}
