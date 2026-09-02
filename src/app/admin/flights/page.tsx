"use client";

import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminTable, type AdminTableColumn } from "@/components/admin/admin-table";
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button";
import { SavedBanner } from "@/components/admin/saved-banner";
import { Button } from "@/components/ui/button";
import { listFlightOffers, deleteFlightOffer } from "@/lib/admin/api/flights";
import { formatNaira } from "@/lib/admin/utils/format";
import type { FlightOffer } from "@/lib/admin/types";

export default function FlightsListPage() {
  const [flightOffers, setFlightOffers] = useState<FlightOffer[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    listFlightOffers()
      .then(setFlightOffers)
      .catch(() => setError("Could not load flight offers."));
  }, []);

  async function handleDelete(id: string) {
    await deleteFlightOffer(id);
    setFlightOffers((prev) => (prev ?? []).filter((offer) => offer.id !== id));
  }

  const columns: AdminTableColumn<FlightOffer>[] = [
    {
      key: "route",
      header: "Route",
      cell: (offer) => `${offer.from} (${offer.fromCode}) → ${offer.to} (${offer.toCode})`,
    },
    { key: "tripType", header: "Trip Type", cell: (offer) => offer.tripType },
    { key: "stops", header: "Stops", cell: (offer) => (offer.stops === 0 ? "Nonstop" : offer.stops) },
    { key: "price", header: "Price", cell: (offer) => formatNaira(offer.price) },
    {
      key: "actions",
      header: "",
      className: "px-4 py-3 text-right",
      cell: (offer) => (
        <div className="flex items-center justify-end">
          <ConfirmDeleteButton onConfirm={() => handleDelete(offer.id)} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Flight Offers"
        description="Featured flight routes shown on the Travel & Tours site."
        action={
          <Button href="/admin/flights/new" size="md">
            New Offer
          </Button>
        }
      />

      <SavedBanner createdMessage="Flight offer added." updatedMessage="Flight offer updated." />

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {flightOffers === null ? (
        <div className="rounded-[2px] border border-border-primary p-12 text-center text-sm text-text-tertiary">
          Loading…
        </div>
      ) : (
        <AdminTable
          columns={columns}
          rows={flightOffers}
          rowKey={(offer) => offer.id}
          rowHref={(offer) => `/admin/flights/${offer.id}`}
          emptyMessage="No flight offers yet."
        />
      )}
    </div>
  );
}
