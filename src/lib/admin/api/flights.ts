import { apiFetch } from "@/lib/admin/api/client";
import type { FlightOffer } from "@/lib/admin/types";

export function listFlightOffers() {
  return apiFetch<FlightOffer[]>("/api/admin/flights");
}

export function getFlightOffer(id: string) {
  return apiFetch<FlightOffer>(`/api/admin/flights/${encodeURIComponent(id)}`);
}

export function createFlightOffer(data: Omit<FlightOffer, "id">) {
  return apiFetch<FlightOffer>("/api/admin/flights", { method: "POST", body: JSON.stringify(data) });
}

export function updateFlightOffer(id: string, data: Partial<Omit<FlightOffer, "id">>) {
  return apiFetch<FlightOffer>(`/api/admin/flights/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteFlightOffer(id: string) {
  return apiFetch<{ ok: true }>(`/api/admin/flights/${encodeURIComponent(id)}`, { method: "DELETE" });
}
